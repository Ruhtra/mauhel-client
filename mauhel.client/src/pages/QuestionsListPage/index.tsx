
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Calendar, Trash2, Play, FastForward, FileText, Copy } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateGroupDialog } from "./CreateDialog"
import { Link } from "react-router-dom"

type QuestionGroup = {
  id: number
  title: string
  totalQuestions: number
  answeredQuestions: number
  subjects: number
  dateRange: string
  timeSpent: number
  status: 'not_started' | 'in_progress' | 'completed'
}

export function QuestionsListPage() {
  const currentYear = new Date().getFullYear()
  const questionGroups: QuestionGroup[] = [
    { id: 1, title: "Simulado ENEM 2023", totalQuestions: 90, answeredQuestions: 0, subjects: 4, dateRange: "2010-2023", timeSpent: 0, status: 'not_started' },
    { id: 2, title: "Revisão de Matemática", totalQuestions: 30, answeredQuestions: 15, subjects: 1, dateRange: "2015-2023", timeSpent: 3600, status: 'in_progress' },
    { id: 3, title: "Português e Redação", totalQuestions: 25, answeredQuestions: 25, subjects: 2, dateRange: "2018-2023", timeSpent: 7200, status: 'completed' },
    { id: 4, title: "Ciências da Natureza", totalQuestions: 45, answeredQuestions: 0, subjects: 3, dateRange: `Até ${currentYear}`, timeSpent: 0, status: 'not_started' },
    { id: 5, title: "História e Geografia", totalQuestions: 50, answeredQuestions: 0, subjects: 2, dateRange: `Até ${currentYear}`, timeSpent: 0, status: 'not_started' },
  ]

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const getButtonProps = (status: QuestionGroup['status']) => {
    switch (status) {
      case 'not_started':
        return { text: 'Iniciar', icon: Play, variant: 'default' as const }
      case 'in_progress':
        return { text: 'Continuar', icon: FastForward, variant: 'default' as const }
      case 'completed':
        return { text: 'Ver Resumo', icon: FileText, variant: 'outline' as const }
    }
  }

  const handleDelete = (id: number) => {
    console.log(`Deletando grupo ${id}`)
    // Implementar lógica de deleção aqui
  }

  const handleDuplicate = (group: QuestionGroup) => {
    console.log(`Duplicando grupo ${group.id}`)
    // Implementar lógica de duplicação aqui
  }

  return (
    <div className="h-full bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Grupos de Questões</h2>
          <CreateGroupDialog />
        </div>

        <div className="flex flex-wrap justify-start gap-4">
          {questionGroups.map((group) => {
            const buttonProps = getButtonProps(group.status)
            return (
              <Card key={group.id} className="hover:shadow-lg transition-shadow duration-300 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]">
                <CardHeader className="p-3 pb-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-sm">{group.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
                          <span className="sr-only">Abrir menu</span>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDuplicate(group)}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(group.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Apagar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <BookOpen className="mr-1 h-3 w-3" />
                      <span>{group.answeredQuestions}/{group.totalQuestions} questões</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>{group.subjects} matérias</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{group.dateRange}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>Tempo: {formatTime(group.timeSpent)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3">
                  <Link to={'./question'} className="w-full">
                  <Button size="sm" variant={buttonProps.variant} className="w-full text-xs">
                    <buttonProps.icon className="mr-1 h-3 w-3" />
                    {buttonProps.text}
                  </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}