import { Link } from 'react-router-dom'

export default function ListingCard({ marketer }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{marketer.name}</h3>
          <p className="text-sm text-gray-500">{marketer.category}</p>
        </div>
        {marketer.rating && (
          <div className="text-xs px-2 py-1 rounded-full bg-gray-100">{marketer.rating.toFixed(1)}★</div>
        )}
      </div>
      <p className="text-sm mt-2 line-clamp-2">{marketer.bio}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {marketer.tags?.slice(0,3).map(t => (
          <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{t}</span>
        ))}
      </div>
      <div className="mt-4">
        <Link to={`/listings/${marketer.id}`} className="btn-primary">View</Link>
      </div>
    </div>
  )
}
