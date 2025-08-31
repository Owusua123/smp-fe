import { useParams, Link } from 'react-router-dom'
import { useData } from '../state/DataContext.jsx'
import { useAuth } from '../state/AuthContext.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import { useMemo, useState } from 'react'

export default function ListingDetail() {
  const { id } = useParams()
  const { db, addReview } = useData()
  const { user } = useAuth()
  const marketer = db.marketers.find(m => m.id === id)
  const reviews = useMemo(() => db.reviews.filter(r => r.marketerId === id), [db.reviews, id])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  if (!marketer) return <p>Not found.</p>

  return (
    <section className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 card">
        <h2 className="text-2xl font-semibold">{marketer.name}</h2>
        <p className="text-gray-500">{marketer.category}</p>
        <p className="mt-3 text-sm">{marketer.bio}</p>
        <h3 className="mt-5 font-semibold">Services</h3>
        <ul className="list-disc pl-6 text-sm mt-2">
          {marketer.services?.map(s => <li key={s}>{s}</li>)}
        </ul>
        <h3 className="mt-5 font-semibold">Portfolio</h3>
        <ul className="list-disc pl-6 text-sm mt-2">
          {marketer.portfolio?.length ? marketer.portfolio.map(p => (
            <li key={p.link}><a href={p.link} target="_blank" className="underline">{p.title}</a></li>
          )) : <li>No items yet.</li>}
        </ul>
      </div>
      <aside className="space-y-4">
        <div className="card">
          <h3 className="font-semibold">Contact</h3>
          {!user ? (
            <p className="text-sm mt-2">Please <Link to="/login" className="underline">sign in</Link> to connect.</p>
          ) : (
            <p className="text-sm mt-2">Demo MVP — contact is disabled.</p>
          )}
        </div>
        <div className="card">
          <h3 className="font-semibold">Reviews</h3>
          <div className="space-y-3 mt-3">
            {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
            {!reviews.length && <p className="text-sm text-gray-500">No reviews yet.</p>}
          </div>
          {user?.role === 'client' && (
            <form className="mt-4 space-y-2" onSubmit={(e)=>{
              e.preventDefault()
              const newReview = {
                id: crypto.randomUUID(),
                marketerId: id,
                userId: user.id,
                userName: user.name || user.email,
                rating: Number(rating),
                comment,
                createdAt: new Date().toISOString()
              }
              addReview(newReview)
              setComment('')
              setRating(5)
            }}>
              <label className="block">
                <span className="label">Rating</span>
                <select className="input" value={rating} onChange={e=>setRating(e.target.value)}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="label">Comment</span>
                <textarea className="input" rows="3" value={comment} onChange={e=>setComment(e.target.value)} placeholder="Share your experience…" />
              </label>
              <button className="btn-primary w-full" type="submit">Submit Review</button>
            </form>
          )}
        </div>
      </aside>
    </section>
  )
}
