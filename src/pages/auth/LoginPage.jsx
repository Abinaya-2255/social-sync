import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { validateLoginForm } from '../../lib/validators.js'
import Button from '../../components/ui/Button.jsx'
import FormField from '../../components/forms/FormField.jsx'
import Input from '../../components/forms/Input.jsx'
import Loader from '../../components/ui/Loader.jsx'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { login, loginWithGoogle, isAuthenticated, isLoading: authLoading } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/app/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate, from])

  if (authLoading) {
    return <Loader fullScreen label="Connecting to your workspace..." />
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((e2) => ({ ...e2, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateLoginForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsLoading(true)
    try {
      await login(form)
      success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err2) {
      error(err2?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      await loginWithGoogle()
    } catch (err2) {
      error(err2?.message || 'Google login failed. Please try again.')
      setIsGoogleLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-primary mb-1">Welcome back</h1>
      <p className="text-sm text-muted mb-8">Sign in to your Social Sync account</p>

      <Button
        variant="secondary"
        className="w-full flex items-center justify-center gap-2 mb-4"
        onClick={handleGoogleLogin}
        isLoading={isGoogleLoading}
      >
        <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.23 2.76 1.34 6.787l3.926 2.978Z"
          />
          <path
            fill="#4285F4"
            d="M23.49 12.275c0-.818-.073-1.636-.218-2.436H12v4.618h6.455a5.518 5.518 0 0 1-2.395 3.618l3.727 2.891c2.182-2.01 3.436-4.973 3.436-8.691Z"
          />
          <path
            fill="#FBBC05"
            d="M5.266 14.235 1.34 17.213C3.23 21.24 7.27 24 12 24c3.155 0 5.8-.1.045-2.736l-3.727-2.891a4.27 4.27 0 0 1-3.007.864c-1.8 0-3.327-.927-4.145-2.509Z"
          />
          <path
            fill="#34A853"
            d="M5.266 9.765C5.03 10.48 4.909 11.236 4.909 12c0 .764.12 1.52.357 2.235l-3.926 2.978A11.905 11.905 0 0 1 0 12c0-1.855.42-3.618 1.164-5.213l4.102 2.978Z"
          />
        </svg>
        Sign in with Google
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-subtle"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface px-3 text-muted">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField label="Email address" id="email" error={errors.email}>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="you@company.com" icon={Mail} error={!!errors.email} autoComplete="email" />
        </FormField>

        <FormField label="Password" id="password" error={errors.password}>
          <Input id="password" name="password" type="password" value={form.password} onChange={handleChange}
            placeholder="••••••••" icon={Lock} error={!!errors.password} autoComplete="current-password" />
        </FormField>

        <div className="flex items-center justify-end">
          <Link to="/auth/forgot-password" className="text-xs text-accent hover:underline">Forgot password?</Link>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>Sign in</Button>
      </form>

      <p className="text-sm text-center text-secondary mt-6">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="text-accent font-medium hover:underline">Create one free</Link>
      </p>
    </>
  )
}
