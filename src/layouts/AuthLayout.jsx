import { Link, Outlet } from 'react-router-dom'
import { APP_TAGLINE } from '../lib/constants.js'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'
import BrandLogo from '../components/ui/BrandLogo.jsx'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-base">
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm mx-auto">
          <Link to="/" className="inline-block mb-10">
            <BrandLogo size={32} />
          </Link>
          <Outlet />
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative accent-gradient items-center justify-center p-16 overflow-hidden">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        <div className="text-white max-w-md">
          <h2 className="text-3xl font-bold leading-tight mb-4">{APP_TAGLINE}</h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Plan, create, schedule, and analyze content for every platform from one
            intelligent, distraction-free workspace built for modern teams.
          </p>
        </div>
      </div>
    </div>
  )
}
