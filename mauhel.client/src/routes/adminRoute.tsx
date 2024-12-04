import { DashboardPage } from '@/pages/admin/DashboardPage'
import { Route } from 'react-router-dom'
import { LayoutAdmin } from '../components/LayoutAdmin'
import { ExamsPage } from '@/pages/admin/ExamsPage'
import { ExamQuestionsPage } from '@/pages/admin/ExamsPage/ExamQuestionsPage'

export function AdminRoute() {
  return (
    <Route path="/admin" element={<LayoutAdmin />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="exams">
        <Route index element={<ExamsPage />} />
        <Route path="questions" element={<ExamQuestionsPage />} />
      </Route>
    </Route>
  )
}
