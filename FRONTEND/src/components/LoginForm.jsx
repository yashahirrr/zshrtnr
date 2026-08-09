import { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from '@tanstack/react-router'
import { loginUser } from '../api/user.api'
import { login } from '../store/slice/authSlice'
import Card, { CardContent } from './ui/Card'
import Input from './ui/Input'
import Button from './ui/Button'

const LoginForm = ({ onSwitch }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await loginUser(password, email)
      dispatch(login(data.user))
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.')
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
            label="Email"
            id="login-email"
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
            id="login-password"
            type="password"
            icon={Lock}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button type="submit" className="w-full" size="lg" loading={loading} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="font-medium text-primary hover:underline focus:outline-none focus-visible:underline"
          >
            Register
          </button>
        </p>
      </CardContent>
    </Card>
  )
}

export default LoginForm
