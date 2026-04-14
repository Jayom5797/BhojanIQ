import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/analyze', label: 'Analysis' },
  { to: '/history', label: 'History' },
  { to: '/how-it-works', label: 'How it Works' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 h-16 bg-surface/90 backdrop-blur-md border-b border-surface-container-highest">
      <Link to="/" className="text-2xl font-bold tracking-tighter text-primary font-headline">
        BhojanIQ
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`font-headline tracking-tight transition-colors duration-300 ${
              pathname === to
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <Link to="/onboarding" className="btn-primary text-sm px-5 py-2">
        Get Started
      </Link>
    </nav>
  )
}
