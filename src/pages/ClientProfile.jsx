import { useAuth } from '../state/AuthContext.jsx'
import { useData } from '../state/DataContext.jsx'
import { useState } from 'react'

export default function ClientProfile() {
  const { user } = useAuth()
  const { updateUser } = useData()
  const [name, setName] = useState(user?.name || '')
  const [logo, setLogo] = useState('')

  return (
    <div className="max-w-lg mx-auto card">
      <h2 className="text-xl font-semibold">Brand Profile</h2>
      <form className="mt-4 space-y-3" onSubmit={(e)=>{
        e.preventDefault()
        updateUser(user.id, { name, logo })
        alert('Saved!')
      }}>
        <label className="block">
          <span className="label">Brand Name</span>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label className="block">
          <span className="label">Logo URL (optional)</span>
          <input className="input" value={logo} onChange={e=>setLogo(e.target.value)} placeholder="https://…" />
        </label>
        <button className="btn-primary w-full" type="submit">Save</button>
      </form>
    </div>
  )
}
