"use client"

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
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-sidebar shadow-sm h-16 w-full ">
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

        </div>
      </div>
    </header>
  )
}

export default Header
