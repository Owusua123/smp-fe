import { useAuth } from '../state/AuthContext.jsx'
import { useData } from '../state/DataContext.jsx'
import { useMemo, useState } from 'react'

export default function MarketerProfile() {
  const { user } = useAuth()
  const { db, upsertMarketer } = useData()

  const existing = useMemo(() => db.marketers.find(m => m.userId === user.id), [db.marketers, user.id])

  const [name, setName] = useState(existing?.name || user.name || '')
  const [category, setCategory] = useState(existing?.category || 'Content Marketing')
  const [bio, setBio] = useState(existing?.bio || '')
  const [services, setServices] = useState((existing?.services || []).join(', '))
  const [tags, setTags] = useState((existing?.tags || []).join(', '))
  const [portfolio, setPortfolio] = useState((existing?.portfolio || []).map(p => `${p.title}|${p.link}`).join('\n'))

  return (
    <div className="max-w-2xl mx-auto card">
      <h2 className="text-xl font-semibold">Your Marketer Profile</h2>
      <form className="mt-4 space-y-3" onSubmit={(e)=>{
        e.preventDefault()
        const svc = services.split(',').map(s => s.trim()).filter(Boolean)
        const t = tags.split(',').map(s => s.trim()).filter(Boolean)
        const pf = portfolio.split('\n').map(l => {
          const [title, link] = l.split('|').map(s=>s?.trim())
          if (!title || !link) return null
          return { title, link }
        }).filter(Boolean)
        const patch = {
          userId: user.id,
          name, category, bio, services: svc, tags: t, portfolio: pf
        }
        const id = existing?.id || crypto.randomUUID()
        upsertMarketer(id, patch)
        alert('Saved!')
      }}>
        <label className="block"><span className="label">Display Name</span><input className="input" value={name} onChange={e=>setName(e.target.value)} required /></label>
        <label className="block"><span className="label">Category</span>
          <select className="input" value={category} onChange={e=>setCategory(e.target.value)}>
            <option>Content Marketing</option>
            <option>Social Media</option>
            <option>Paid Ads</option>
            <option>Email Marketing</option>
            <option>SEO</option>
          </select>
        </label>
        <label className="block"><span className="label">Bio</span><textarea className="input" rows="3" value={bio} onChange={e=>setBio(e.target.value)} /></label>
        <label className="block"><span className="label">Services (comma-separated)</span><input className="input" value={services} onChange={e=>setServices(e.target.value)} /></label>
        <label className="block"><span className="label">Tags (comma-separated)</span><input className="input" value={tags} onChange={e=>setTags(e.target.value)} /></label>
        <label className="block"><span className="label">Portfolio (one per line: Title|https://link)</span><textarea className="input" rows="4" value={portfolio} onChange={e=>setPortfolio(e.target.value)} /></label>
        <button className="btn-primary w-full" type="submit">Save</button>
      </form>
    </div>
  )
}
