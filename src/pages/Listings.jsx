import { useMemo, useState } from 'react'
import { useData } from '../state/DataContext.jsx'
import ListingCard from '../components/ListingCard.jsx'

export default function Listings() {
  const { db } = useData()
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')

  const tags = useMemo(()=>{
    const t = new Set()
    db.marketers.forEach(m => (m.tags||[]).forEach(t.add, t))
    return Array.from(t)
  }, [db.marketers])

  const filtered = db.marketers.filter(m => {
    const matchQ = q ? (m.name.toLowerCase().includes(q.toLowerCase()) || m.category.toLowerCase().includes(q.toLowerCase())) : true
    const matchTag = tag ? (m.tags||[]).includes(tag) : true
    return matchQ && matchTag
  })

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-end gap-3 mb-4">
        <label className="flex-1">
          <span className="label">Search</span>
          <input className="input" placeholder="Name or category…" value={q} onChange={e=>setQ(e.target.value)} />
        </label>
        <label className="w-full md:w-60">
          <span className="label">Filter by tag</span>
          <select className="input" value={tag} onChange={e=>setTag(e.target.value)}>
            <option value="">All</option>
            {tags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map(m => <ListingCard key={m.id} marketer={m} />)}
      </div>
    </section>
  )
}
