'use client'

import { useState, useEffect, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  MessageCircle,
  CheckCircle,
  XCircle,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Link, useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { faker } from '@faker-js/faker'

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  subject: string
  order: string // Added order property
  marked: boolean
}

const questions: Question[] = []

for (let i = 0; i < 10; i++) {
  const subjects = [
    'Matemática',
    'Português',
    'História',
    'Geografia',
    'Ciências',
    'Inglês'
  ]
  const subject = subjects[Math.floor(Math.random() * subjects.length)]
  const text = faker.lorem.paragraphs(2)
  const options = []
  for (let j = 0; j < 4; j++) {
    options.push(faker.lorem.sentence())
  }
  const correctAnswer = Math.floor(Math.random() * 4)

  questions.push({
    id: crypto.randomUUID(),
    subject,
    text,
    options,
    correctAnswer,
    order: `${i + 1}ª`, // Added order
    marked: false
  })
}

export function QuestionsGroupPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false)
  const [direction, setDirection] = useState(0)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  const [isAnswerBlockExpanded, setIsAnswerBlockExpanded] = useState(true)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleConfirmAnswer = () => {
    if (selectedAnswer !== null) {
      setIsAnswerConfirmed(true)
      setAnsweredQuestions(prev => new Set(prev).add(currentQuestionIndex))
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerConfirmed(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1)
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(null)
      setIsAnswerConfirmed(false)
    }
  }

  const handleGoBack = () => {
    navigate('..')
  }

  const handleJumpToQuestion = (index: number) => {
    setDirection(index > currentQuestionIndex ? 1 : -1)
    setCurrentQuestionIndex(index)
    setSelectedAnswer(null)
    setIsAnswerConfirmed(false)
    setIsDialogOpen(false)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      zIndex: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      zIndex: 0
    })
  }

  const renderOptions = () => (
    <div className="flex-grow space-y-2">
      {currentQuestion.options.map((option, index) => (
        <motion.button
          key={index}
          onClick={() => !isAnswerConfirmed && setSelectedAnswer(index)}
          className={`flex w-full items-start rounded-lg p-2 text-left text-sm transition-colors ${
            isAnswerConfirmed
              ? index === currentQuestion.correctAnswer
                ? 'bg-green-100 dark:bg-green-900'
                : index === selectedAnswer
                  ? 'bg-red-100 dark:bg-red-900'
                  : 'bg-gray-100 dark:bg-gray-800'
              : selectedAnswer === index
                ? 'bg-primary text-primary-foreground'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          animate={
            isAnswerConfirmed &&
            (index === currentQuestion.correctAnswer ||
              index === selectedAnswer)
              ? { scale: [1, 1.03, 1] }
              : {}
          }
          transition={{ duration: 0.2 }}
        >
          <span className="bg-primary text-primary-foreground mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold">
            {String.fromCharCode(65 + index)}
          </span>
          <span className="flex-grow text-xs">{option}</span>
          {isAnswerConfirmed && index === currentQuestion.correctAnswer && (
            <CheckCircle className="ml-2 h-3 w-3 flex-shrink-0 text-green-600" />
          )}
          {isAnswerConfirmed &&
            index === selectedAnswer &&
            index !== currentQuestion.correctAnswer && (
              <XCircle className="ml-2 h-3 w-3 flex-shrink-0 text-red-600" />
            )}
        </motion.button>
      ))}
    </div>
  )

  const renderQuestionNavigator = () => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {currentQuestionIndex + 1} / {questions.length}
        </Button>
      </DialogTrigger>
      <DialogContent className={`max-w-[90svw] sm:max-w-[425px]`}>
        <DialogHeader>
          <DialogTitle>Navegador de Questões</DialogTitle>
          <DialogDescription>
            Clique em uma questão para navegar diretamente para ela.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[60vh]">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, index) => (
              <DialogClose asChild key={question.id}>
                <Button
                  variant={
                    currentQuestionIndex === index ? 'default' : 'outline'
                  }
                  className="relative aspect-square w-full"
                  onClick={() => handleJumpToQuestion(index)}
                >
                  <span className="sr-only">Questão {question.order}</span>
                  <span className="text-lg">{index + 1}</span>
                  {answeredQuestions.has(index) && (
                    <Badge
                      variant="secondary"
                      className="absolute right-0 top-0"
                    >
                      <CheckCircle className="h-3 w-3" />
                    </Badge>
                  )}
                </Button>
              </DialogClose>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="bg-background flex h-full flex-col">
      <header className="bg-card sticky top-0 z-10 p-3 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="absolute left-1/2 -translate-x-1/2 transform text-center">
            <h1 className="text-lg font-bold">{currentQuestion.subject}</h1>
            <span className="text-muted-foreground text-xs">
              {currentQuestion.order} Questão
            </span>
          </div>
          <Link to="./comments">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
                /* Implementar navegação para comentários */
              }}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-grow flex-col overflow-hidden">
        <div className="flex-grow overflow-hidden p-3 lg:p-4">
          <div className="relative mx-auto h-full max-w-7xl overflow-hidden">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={currentQuestion.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 200, damping: 25 },
                  opacity: { duration: 0.2 },
                  zIndex: { delay: 0.2 }
                }}
                layout
                className="absolute flex h-full w-full flex-col"
              >
                <div
                  className={`flex h-full flex-col ${isDesktop ? 'lg:flex-row lg:gap-6' : ''}`}
                >
                  <div
                    className={`${isDesktop ? 'lg:mb-0 lg:w-1/2' : 'relative h-full flex-grow'}`}
                  >
                    <ScrollArea className="h-full">
                      <h2 className="mb-3 pr-3 text-sm font-semibold lg:text-base">
                        {currentQuestion.text.split('\n').map((e, i) => (
                          <Fragment key={i}>
                            {e}
                            <br />
                          </Fragment>
                        ))}
                      </h2>
                    </ScrollArea>
                  </div>
                  {isDesktop && (
                    <div className="flex flex-col lg:w-1/2">
                      {renderOptions()}
                      <div className="mt-3">
                        <Button
                          onClick={handleConfirmAnswer}
                          disabled={
                            selectedAnswer === null || isAnswerConfirmed
                          }
                          className="w-full py-1.5 text-sm"
                        >
                          Confirmar Resposta
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {!isDesktop && (
          <div className="bg-card p-3 shadow-md">
            <div className="border-border mb-2 space-y-2 rounded-lg border p-2">
              <Button
                variant="ghost"
                onClick={() => setIsAnswerBlockExpanded(!isAnswerBlockExpanded)}
                className="flex w-full items-center justify-between py-1 text-sm"
              >
                {isAnswerBlockExpanded
                  ? 'Esconder Alternativas'
                  : 'Mostrar Alternativas'}
                {isAnswerBlockExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              <AnimatePresence>
                {isAnswerBlockExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderOptions()}
                    <div className="mt-3">
                      <Button
                        onClick={handleConfirmAnswer}
                        disabled={selectedAnswer === null || isAnswerConfirmed}
                        className="w-full py-1.5 text-sm"
                      >
                        Confirmar Resposta
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-card p-3 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between lg:justify-center lg:gap-4">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center text-xs"
          >
            <ChevronLeft className="mr-1 h-3 w-3" /> Anterior
          </Button>
          {renderQuestionNavigator()}
          <Button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            variant="outline"
            className="flex items-center text-xs"
          >
            Próxima <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </footer>
    </div>
  )
}
