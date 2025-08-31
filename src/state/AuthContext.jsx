import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const defaultUser = null // { email, role, name, id }
const KEY = 'mvp_auth_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(KEY)
    return saved ? JSON.parse(saved) : defaultUser
  })

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user))
    else localStorage.removeItem(KEY)
  }, [user])

  function login({ email, password }) {
    // MVP: accept any password, infer role by email hint or registered user in DataContext
    // If a registered user exists, use that. Otherwise fallback to role by prefix.
    const db = JSON.parse(localStorage.getItem('mvp_db') || '{}')
    const existing = db.users?.find(u => u.email === email)
    if (existing) {
      setUser(existing)
      return { ok: true }
    }
    const roleHint = email.startsWith('admin') ? 'admin' : email.includes('+client') ? 'client' : email.includes('+marketer') ? 'marketer' : 'guest'
    const newUser = { id: crypto.randomUUID(), email, role: roleHint, name: email.split('@')[0] }
    // store minimally
    db.users = db.users || []
    db.users.push(newUser)
    localStorage.setItem('mvp_db', JSON.stringify(db))
    setUser(newUser)
    return { ok: true }
  }

  function register({ email, password, role, name }) {
    const db = JSON.parse(localStorage.getItem('mvp_db') || '{}')
    db.users = db.users || []
    if (db.users.some(u => u.email === email)) {
      return { ok: false, error: 'Email already registered' }
    }
    const newUser = { id: crypto.randomUUID(), email, role, name }
    db.users.push(newUser)
    localStorage.setItem('mvp_db', JSON.stringify(db))
    setUser(newUser)
    return { ok: true }
  }

  function logout() {
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
