import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Home, Dumbbell, Calendar, Apple, TrendingUp, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/dashboard', label: 'Главная', icon: Home },
    { path: '/workouts', label: 'Тренировки', icon: Dumbbell },
    { path: '/programs', label: 'Программы', icon: Calendar },
    { path: '/nutrition', label: 'Питание', icon: Apple },
    { path: '/analytics', label: 'Аналитика', icon: TrendingUp },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-dark-card border-b border-dark-border sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <Dumbbell className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">FitnessPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(link.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-dark-bg hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <button
              onClick={logout}
              className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all"
            >
              <LogOut size={18} />
              <span>Выйти</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-dark-bg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-dark-border bg-dark-card">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(link.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-dark-bg'
                  }`}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
            <button
              onClick={() => {
                logout()
                setIsMobileMenuOpen(false)
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all"
            >
              <LogOut size={20} />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar