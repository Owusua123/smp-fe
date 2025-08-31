import { useState } from 'react'
import { useAuth } from '../state/AuthContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('client')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold">Create account</h2>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      <form className="mt-4 space-y-3" onSubmit={(e)=>{
        e.preventDefault()
        const { ok, error } = register({ email, password, role, name })
        if (!ok) setError(error || 'Registration failed')
        else navigate('/')
      }}>
        <label className="block">
          <span className="label">Name</span>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label className="block">
          <span className="label">Email</span>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label className="block">
          <span className="label">Password</span>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <label className="block">
          <span className="label">Role</span>
          <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="client">Client (Brand)</option>
            <option value="marketer">Marketer</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button className="btn-primary w-full" type="submit">Register</button>
      </form>
      <p className="text-xs mt-3">Have an account? <Link to="/login" className="underline">Login</Link></p>
    </div>
  )
}
