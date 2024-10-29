import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'
import { Layout } from './components/Layout'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { ProfileSettingsPage } from './pages/ProfileSettingsPage'
import { QuestionsPage } from './pages/Questions'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LoadingApp } from './components/LoadingApp'

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
        {/* Login pode ser acessado sem autenticação */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <LoginPage />}
        />
        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="profile">
              <Route path="settings" element={<ProfileSettingsPage />} />
            </Route>
          </Route>
        </Route>
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
