import { Link } from "react-router-dom"
import { BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/context/auth-provider"
import { getAuthorizationUrl } from "@/api/google-auth"

export default function Header() {
  const { user, logout } = useAuth()

  const handleGoogleSignIn = async () => {
    try {
      const authUrl = await getAuthorizationUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Google login error:', error);
    }
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <Link to="/" className="text-xl font-bold">
            Thesis Forge
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link to="/theses" className="text-sm font-medium hover:underline">
            Theses
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Hello, {user.name}</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
          )}
        </div>
      </div>
    </header>
  )
}

