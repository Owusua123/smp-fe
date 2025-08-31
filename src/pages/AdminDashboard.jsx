import { useData } from '../state/DataContext.jsx'
import ReviewCard from '../components/ReviewCard.jsx'

export default function AdminDashboard() {
  const { db, deleteUser, toggleUserStatus, removeReview } = useData()

  return (
    <section className="space-y-6">
      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {db.users.map(u => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="py-2 pr-4">{u.name || '—'}</td>
                  <td className="py-2 pr-4">{u.email}</td>
                  <td className="py-2 pr-4">{u.role}</td>
                  <td className="py-2 pr-4">{u.status || 'active'}</td>
                  <td className="py-2 pr-4 space-x-2">
                    <button className="btn-ghost" onClick={()=>toggleUserStatus(u.id)}>{(u.status||'active')==='active' ? 'Suspend' : 'Activate'}</button>
                    <button className="btn-ghost" onClick={()=>deleteUser(u.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {db.reviews.map(r => (
            <ReviewCard key={r.id} review={r} onRemove={removeReview} canModerate />
          ))}
          {!db.reviews.length && <p className="text-sm text-gray-500">No reviews yet.</p>}
        </div>
      </div>
    </section>
  )
}
