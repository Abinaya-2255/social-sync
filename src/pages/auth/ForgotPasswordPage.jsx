import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { authService } from '../../services/modules/authService.js'
import { useToast } from '../../context/ToastContext.jsx'
import { isValidEmail } from '../../lib/validators.js'
import Button from '../../components/ui/Button.jsx'
import FormField from '../../components/forms/FormField.jsx'
import Input from '../../components/forms/Input.jsx'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) { setError('Please enter a valid email address'); return }
    setIsLoading(true)
    try {
      await authService.forgotPassword({ email })
      setSent(true)
    } catch {
      toast.error('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">Check your inbox</h1>
        <p className="text-sm text-muted mb-6">We sent password reset instructions to <strong className="text-primary">{email}</strong>.</p>
        <Link to="/auth/login" className="text-sm text-accent hover:underline">Back to sign in</Link>
      </div>
    )
  }

  return (
    <>
      <Link to="/auth/login" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary mb-8">
        <ArrowLeft size={14} /> Back to sign in
      </Link>
      <h1 className="text-2xl font-bold text-primary mb-1">Reset your password</h1>
      <p className="text-sm text-muted mb-8">Enter your email and we'll send you reset instructions.</p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FormField label="Email address" id="email" error={error}>
          <Input id="email" name="email" type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder="you@company.com" icon={Mail} error={!!error} autoComplete="email" />
        </FormField>
        <Button type="submit" className="w-full" isLoading={isLoading}>Send reset link</Button>
      </form>
    </>
  )
}
