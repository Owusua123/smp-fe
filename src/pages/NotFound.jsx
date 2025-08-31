import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="max-w-md mx-auto card text-center">
      <h2 className="text-2xl font-semibold">404</h2>
      <p className="text-sm text-gray-500 mt-2">We couldn't find that page.</p>
      <Link to="/" className="btn-primary mt-4">Go Home</Link>
    </div>
  )
}
