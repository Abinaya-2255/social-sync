import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { validateSignupForm } from '../../lib/validators.js'
import Button from '../../components/ui/Button.jsx'
import FormField from '../../components/forms/FormField.jsx'
import Input from '../../components/forms/Input.jsx'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()

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
      await signup(form)
      success('Account created! Welcome to Social Sync.')
      navigate('/app/dashboard')
    } catch (err2) {
      error(err2?.message || 'Sign up failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-primary mb-1">Create your account</h1>
      <p className="text-sm text-muted mb-8">Start your 14-day free trial — no credit card required</p>

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
