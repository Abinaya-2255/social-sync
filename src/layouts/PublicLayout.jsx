import { Link, NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { APP_NAME } from '../lib/constants.js'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'
import Button from '../components/ui/Button.jsx'
import BrandLogo from '../components/ui/BrandLogo.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import Loader from '../components/ui/Loader.jsx'

const LINKS = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  console.log("PUBLIC LAYOUT")
  console.log(isAuthenticated)
  console.log(isLoading)

  useEffect(() => {
    if (!isLoading && isAuthenticated && window.location.pathname === '/') {
      navigate('/app/dashboard', { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return <Loader fullScreen label="Loading Social Sync..." />
  }

  if (isAuthenticated && window.location.pathname === '/') {
    return <Navigate replace to="/app/dashboard" />
  }

  return (
    <div className="min-h-screen flex flex-col bg-base">
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-subtle">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="shrink-0">
            <BrandLogo size={32} />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-150 ${isActive ? 'text-accent' : 'text-secondary hover:text-primary'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth/login')}>
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate('/auth/signup')}>
              Get Started
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-xl text-secondary hover:bg-surface-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-subtle bg-surface px-4 py-4 flex flex-col gap-3">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-secondary hover:text-primary py-1.5"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => navigate('/auth/login')}>
                Log in
              </Button>
              <Button size="sm" className="flex-1" onClick={() => navigate('/auth/signup')}>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-subtle bg-surface relative overflow-hidden">
        {/* Subtle Ambient Lighting & Low-Opacity Mockup Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#00D16C_1px,transparent_1px)] [background-size:24px_24px] -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <BrandLogo size={28} textClassName="font-semibold text-primary text-sm" />
            </div>
            <p className="text-xs text-muted">Plan once. Publish everywhere.</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary mb-3">Product</p>
            <div className="flex flex-col gap-2 text-sm text-secondary">
              <Link to="/features" className="hover:text-primary">Features</Link>
              <Link to="/pricing" className="hover:text-primary">Pricing</Link>
              <Link to="/faq" className="hover:text-primary">FAQ</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary mb-3">Company</p>
            <div className="flex flex-col gap-2 text-sm text-secondary">
              <Link to="/about" className="hover:text-primary">About</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-primary mb-3">Legal</p>
            <div className="flex flex-col gap-2 text-sm text-secondary">
              <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary">Terms & Conditions</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-subtle py-4 text-center text-xs text-muted relative z-10">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
