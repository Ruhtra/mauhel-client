import { Route } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { HomePage } from '@/pages/HomePage'
import { ProfilePage } from '@/pages/ProfilePage'
import { QuestionsListPage } from '@/pages/QuestionsListPage'
import { LayoutQuestions } from '../components/LayoutQuesions'
import { QuestionsGroupPage } from '@/pages/QuestionsListPage/QuestionGroupPage'
import { CommentsPage } from '@/pages/QuestionsListPage/QuestionGroupPage/CommentsPage'

export function UserRoute() {
  return (
    <Route>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="profile">
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path="questions">
          <Route index element={<QuestionsListPage />} />
        </Route>
      </Route>

      {/* Rota de QuestionsGroupPage sem Layout */}
      <Route path="questions">
        <Route path="question" element={<LayoutQuestions />}>
          <Route index element={<QuestionsGroupPage />} />
          <Route path="comments" element={<CommentsPage />} />
        </Route>
      </Route>
    </Route>
  )
}
