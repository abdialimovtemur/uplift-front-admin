import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Cookies from "js-cookie"   // ✅ faqat shu

export const Settings = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove("access_token") // tokenni o‘chirish
    navigate("/login") // login sahifaga redirect
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Settings</h1>

      <Button
        variant="destructive"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  )
}
