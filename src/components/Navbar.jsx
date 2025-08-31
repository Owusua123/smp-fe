import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">SMP</Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/listings" className="hover:underline">Find Marketers</NavLink>
          {user?.role === 'client' && <NavLink to="/client" className="hover:underline">Client</NavLink>}
          {user?.role === 'marketer' && <NavLink to="/marketer" className="hover:underline">Marketer</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin" className="hover:underline">Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          {!user && (
            <>
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          )}
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-80">{user.email} · {user.role}</span>
              <button className="btn-ghost" onClick={() => { logout(); navigate('/'); }}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
