import { useState } from 'react'
import { useAuth } from '../state/AuthContext.jsx'
import { useLocation, useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold">Login</h2>
      <p className="text-xs text-gray-500">Use a demo email from the home page or your registered one.</p>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      <form className="mt-4 space-y-3" onSubmit={(e)=>{
        e.preventDefault()
        const { ok, error } = login({ email, password })
        if (!ok) setError(error || 'Login failed')
        else navigate(from, { replace: true })
      }}>
        <label className="block">
          <span className="label">Email</span>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label className="block">
          <span className="label">Password</span>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button className="btn-primary w-full" type="submit">Login</button>
      </form>
      <p className="text-xs mt-3">No account? <Link to="/register" className="underline">Register</Link></p>
    </div>
  )
}
