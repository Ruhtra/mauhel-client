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
import { ProfilePage } from './pages/ProfilePage'
import { QuestionsListPage } from './pages/QuestionsListPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LoadingApp } from './components/LoadingApp'
import { LayoutQuestions } from './components/LayoutQuesions'
import { QuestionsGroupPage } from './pages/QuestionsListPage/QuestionGroupPage'

const ProtectedRoute = () => {
  const { token, loading } = useAuth()
  if (loading) return <LoadingApp />

  if (!token) return <Navigate to="/login" replace />
  return <Outlet />
}

function Render() {
  const { token, loading } = useAuth();

  if (loading) return <LoadingApp />;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="profile">
              <Route index element={<ProfilePage />} />
            </Route>
            <Route path="questions" element={<QuestionsListPage />} />
          </Route>
          
          {/* Rota de QuestionsGroupPage sem Layout */}
          <Route path="questions">
            <Route path="question" element={<LayoutQuestions />}>
              <Route index element={<QuestionsGroupPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
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
