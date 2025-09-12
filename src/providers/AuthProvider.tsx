// providers/AuthProvider.tsx
import type { AuthContextType, User } from '@/types/auth'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { toast } from 'sonner'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

// Cookie helper functions
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict${window.location.protocol === 'https:' ? '; Secure' : ''}`
}

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null; // SSR uchun
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

// Token tekshirish funksiyasi
const verifyToken = (token: string): boolean => {
  try {
    // Tokenning payload qismini olamiz
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    
    // Tokenning muddati tekshiriladi
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getCookie('access_token')
        const userData = getCookie('user')
        
        if (token && userData) {
          // Token yaroqli ligini tekshiramiz
          if (verifyToken(token)) {
            try {
              const parsedUser = JSON.parse(userData)
              
              // Check if user has admin role
              if (parsedUser.role === 'ADMIN' || parsedUser.role === 'SUPER_ADMIN') {
                setUser(parsedUser)
              } else {
                // User doesn't have admin privileges, clear cookies
                deleteCookie('access_token')
                deleteCookie('user')
                toast.error('Access denied. Only administrators can access this panel.');
              }
            } catch (error) {
              console.error('Error parsing user data:', error)
              deleteCookie('access_token')
              deleteCookie('user')
            }
          } else {
            // Token yaroqsiz, tozalaymiz
            deleteCookie('access_token')
            deleteCookie('user')
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = (userData: User, token: string) => {
    // Check if user has admin role before logging in
    if (userData.role === 'ADMIN' || userData.role === 'SUPER_ADMIN') {
      // Store token and user data in cookies
      setCookie('access_token', token)
      setCookie('user', JSON.stringify(userData))
      setUser(userData)
    } else {
      toast.error('Access denied. Only administrators can access this panel.');
    }
  }

  const logout = () => {
    // Remove cookies
    deleteCookie('access_token')
    deleteCookie('user')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider