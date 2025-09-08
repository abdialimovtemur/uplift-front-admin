// components/Layout.tsx
import type { ReactNode } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      {/* O'ng tomonda Header + Main */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* Main markazga kelsin */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  )
}

export default Layout
