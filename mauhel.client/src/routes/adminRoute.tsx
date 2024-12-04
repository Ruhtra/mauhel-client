import { DashboardPage } from '@/pages/admin/DashboardPage'
import { Route } from 'react-router-dom'
import { LayoutAdmin } from '../components/LayoutAdmin'
import { ExamsPage } from '@/pages/admin/ExamsPage'

export function AdminRoute() {
  return (
    <Route path="/admin" element={<LayoutAdmin />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="exams" element={<ExamsPage />} />
    </Route>
  )
}
