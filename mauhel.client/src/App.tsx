import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LoadingApp } from './components/LoadingApp'
import { AdminRoute } from './routes/adminRoute'
import { UserRoute } from './routes/userRoute'

const ProtectedRoute = () => {
  const { token, loading } = useAuth()
  if (loading) return <LoadingApp />

  if (!token) return <Navigate to="/login" replace />
  return <Outlet />
}

function Render() {
  const { token, loading } = useAuth()

  if (loading) return <LoadingApp />

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <LoginPage />}
        />

        {AdminRoute()}

        <Route element={<ProtectedRoute />}>{UserRoute()}</Route>
      </Routes>
    </Router>
  )
}

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="layout h-full flex-1">
          <Render />
          {/* <Toaster position="top-left" /> */}
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}
