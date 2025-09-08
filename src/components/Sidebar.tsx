import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"

// Lucide iconlar
import { LayoutDashboard, Settings, Users } from "lucide-react"

const Sidebar = () => {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Logo / Title */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200",
                    isActive
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
        © 2025 Admin Panel
      </div>
    </aside>
  )
}

export default Sidebar
