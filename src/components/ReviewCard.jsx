export default function ReviewCard({ review, onRemove, canModerate=false }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="font-medium">{review.userName}</span>
          <span className="ml-2 text-gray-500">{new Date(review.createdAt).toLocaleString()}</span>
        </div>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{review.rating}★</span>
      </div>
      <p className="mt-2 text-sm">{review.comment}</p>
      {canModerate && (
        <button className="btn-ghost mt-3" onClick={() => onRemove?.(review.id)}>Remove</button>
      )}
    </div>
  )
}
