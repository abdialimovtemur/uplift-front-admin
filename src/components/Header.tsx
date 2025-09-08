"use client"

import { useAuth } from "@/providers/AuthProvider"
import { useTheme } from "@/providers/ThemeProvider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Laptop, Moon, Sun } from "lucide-react"

const Header = () => {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm h-16 w-full ">
      <div className="flex items-center justify-end px-6 py-4">
        {/* Logo / Title */}
      

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Selector */}
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light"><Sun/> Light</SelectItem>
              <SelectItem value="dark"><Moon/> Dark</SelectItem>
              <SelectItem value="system"><Laptop/> System</SelectItem>
            </SelectContent>
          </Select>

          {/* User info */}
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Welcome, {user?.name}
          </span>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
