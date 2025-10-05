import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import WorkoutLog from './pages/WorkoutLog'
import ProgramBuilder from './pages/ProgramBuilder'
import Nutrition from './pages/Nutrition'
import Analytics from './pages/Analytics'
import { ReactNode } from 'react'

// Защищенный роут
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

// Публичный роут (только для неавторизованных)
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()
  return !user ? <>{children}</> : <Navigate to="/dashboard" replace />
}

function App() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workouts"
            element={
              <ProtectedRoute>
                <WorkoutLog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programs"
            element={
              <ProtectedRoute>
                <ProgramBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nutrition"
            element={
              <ProtectedRoute>
                <Nutrition />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      {user && <Footer />}
    </div>
  )
}

export default App