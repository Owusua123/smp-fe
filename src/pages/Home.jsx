import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold">Find the right marketer. Fast.</h1>
        <p className="mt-3 text-gray-600">Browse profiles, see portfolios, and connect — while admins keep the community clean.</p>
        <div className="mt-5 flex gap-3">
          <Link to="/listings" className="btn-primary">Browse Marketers</Link>
          <Link to="/register" className="btn-ghost">Get Started</Link>
        </div>
      </div>
     {/* <div className="card">
        <p className="text-sm text-gray-600">Demo accounts:</p>
        <ul className="mt-2 text-sm list-disc pl-5">
          <li>Admin: <code>admin@goatlogic.dev</code></li>
          <li>Client: <code>brand+client@demo.com</code></li>
          <li>Marketer: <code>sarah+marketer@demo.com</code></li>
          <li>Or register your own with a role</li>
        </ul>
  </div>*/}
    </section>
  )
}
