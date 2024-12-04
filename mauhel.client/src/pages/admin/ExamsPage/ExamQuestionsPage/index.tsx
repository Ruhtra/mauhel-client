import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuestionCard } from './QuestionCard'
import { AddQuestionDialog } from './AddQuestionDialog'

interface Question {
  id: string
  statement: string
  discipline: string
  alternatives: {
    id: string
    content: string
    isCorrect: boolean
  }[]
}

const mockQuestions: Question[] = [
  {
    id: '1',
    statement: 'What is the capital of France?',
    discipline: 'Geography',
    alternatives: [
      { id: 'a', content: 'London', isCorrect: false },
      { id: 'b', content: 'Paris', isCorrect: true },
      { id: 'c', content: 'Berlin', isCorrect: false },
      { id: 'd', content: 'Madrid', isCorrect: false }
    ]
  },
  {
    id: '2',
    statement: 'Who painted the Mona Lisa?',
    discipline: 'Art History',
    alternatives: [
      { id: 'a', content: 'Vincent van Gogh', isCorrect: false },
      { id: 'b', content: 'Leonardo da Vinci', isCorrect: true },
      { id: 'c', content: 'Pablo Picasso', isCorrect: false },
      { id: 'd', content: 'Michelangelo', isCorrect: false }
    ]
  }
]

export function ExamQuestionsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [questions, setQuestions] = useState<Question[]>(mockQuestions)
  const { examId } = useParams<{ examId: string }>()

  const addQuestion = (newQuestion: Question) => {
    setQuestions([...questions, newQuestion])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Questões do Exame {examId}
        </h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Questão
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {questions.map(question => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
      <AddQuestionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddQuestion={addQuestion}
      />
    </div>
  )
}
