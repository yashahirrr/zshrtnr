import { useState } from 'react'
import { Mail, Lock, User } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import { registerUser } from '../api/user.api'
import { login } from '../store/slice/authSlice'
import Card, { CardContent } from './ui/Card'
import Input from './ui/Input'
import Button from './ui/Button'

const RegisterForm = ({ onSwitch }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    setError('')

    try {
      const data = await registerUser(name, password, email)
      dispatch(login(data.user))
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive" role="alert">
              {error}
            </div>
          )}

          <Input
            label="Full Name"
            id="register-name"
            type="text"
            icon={User}
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />

          <Input
            label="Email"
            id="register-email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            id="register-password"
            type="password"
            icon={Lock}
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="new-password"
            hint="Must be at least 6 characters"
          />

          <Button type="submit" className="w-full" size="lg" loading={loading} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="font-medium text-primary hover:underline focus:outline-none focus-visible:underline"
          >
            Sign In
          </button>
        </p>
      </CardContent>
    </Card>
  )
}

export default RegisterForm
