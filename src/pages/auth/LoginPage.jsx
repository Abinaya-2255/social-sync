import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { validateLoginForm } from '../../lib/validators.js'
import Button from '../../components/ui/Button.jsx'
import FormField from '../../components/forms/FormField.jsx'
import Input from '../../components/forms/Input.jsx'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()

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
      navigate('/app/dashboard')
    } catch (err2) {
      error(err2?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-primary mb-1">Welcome back</h1>
      <p className="text-sm text-muted mb-8">Sign in to your Social Sync account</p>

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

      <div className="mt-6 p-4 rounded-xl bg-surface-2 border border-subtle">
        <p className="text-xs text-muted text-center">Demo: enter any email + password to sign in</p>
      </div>

      <p className="text-sm text-center text-secondary mt-6">
        Don't have an account?{' '}
        <Link to="/auth/signup" className="text-accent font-medium hover:underline">Create one free</Link>
      </p>
    </>
  )
}
