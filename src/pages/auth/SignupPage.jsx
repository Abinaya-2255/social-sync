import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { validateSignupForm } from '../../lib/validators.js'
import Button from '../../components/ui/Button.jsx'
import FormField from '../../components/forms/FormField.jsx'
import Input from '../../components/forms/Input.jsx'
import Loader from '../../components/ui/Loader.jsx'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { signup, loginWithGoogle, isAuthenticated, isLoading: authLoading } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/app/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/app/dashboard', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  if (authLoading) {
    return <Loader fullScreen label="Connecting to your workspace..." />
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((err) => ({ ...err, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateSignupForm(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsLoading(true)
    try {
      const res = await signup(form)
      if (res?.session) {
        success('Account created! Welcome to Social Sync.')
        navigate('/app/dashboard', { replace: true })
      } else {
        success('Account created! Please check your email to verify your account.')
        navigate('/auth/login', { replace: true })
      }
    } catch (err2) {
      error(err2?.message || 'Sign up failed. Please try again.')
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
      <h1 className="text-2xl font-bold text-primary mb-1">Create your account</h1>
      <p className="text-sm text-muted mb-8">Start your 14-day free trial — no credit card required</p>

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
        Sign up with Google
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
        <FormField label="Full name" id="name" error={errors.name}>
          <Input id="name" name="name" value={form.name} onChange={handleChange}
            placeholder="Jordan Reyes" icon={User} error={!!errors.name} autoComplete="name" />
        </FormField>
        <FormField label="Email address" id="email" error={errors.email}>
          <Input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="you@company.com" icon={Mail} error={!!errors.email} autoComplete="email" />
        </FormField>
        <FormField label="Password" id="password" error={errors.password} hint="At least 8 characters">
          <Input id="password" name="password" type="password" value={form.password} onChange={handleChange}
            placeholder="Create a password" icon={Lock} error={!!errors.password} autoComplete="new-password" />
        </FormField>
        <FormField label="Confirm password" id="confirmPassword" error={errors.confirmPassword}>
          <Input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword}
            onChange={handleChange} placeholder="Repeat your password" icon={Lock}
            error={!!errors.confirmPassword} autoComplete="new-password" />
        </FormField>

        <Button type="submit" className="w-full" isLoading={isLoading}>Create account</Button>
      </form>

      <p className="text-xs text-muted text-center mt-4">
        By creating an account you agree to our{' '}
        <Link to="/terms" className="text-accent hover:underline">Terms</Link> and{' '}
        <Link to="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>
      </p>

      <p className="text-sm text-center text-secondary mt-6">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-accent font-medium hover:underline">Sign in</Link>
      </p>
    </>
  )
}
