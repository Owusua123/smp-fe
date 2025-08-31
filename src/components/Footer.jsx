export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 text-xs text-gray-500 flex justify-between">
        <p>© {new Date().getFullYear()} GoatLogic</p>
        <p>MVP Demo · React + Tailwind</p>
      </div>
    </footer>
  )
}
