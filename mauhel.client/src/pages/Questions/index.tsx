'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowLeft, MessageCircle, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  subject: string
}

const questions: Question[] = [
  {
    id: '12345678',
    subject: 'História',
    text: 'A Revolução Industrial, iniciada na Inglaterra no século XVIII, foi um marco na história da humanidade, transformando profundamente as estruturas econômicas, sociais e políticas da época. Entre as principais consequências desse processo, podemos citar:\n\nI. O surgimento de uma nova classe social: o proletariado.\nII. A intensificação do êxodo rural e o crescimento desordenado das cidades.\nIII. A diminuição da produção e o aumento dos preços dos produtos industrializados.\nIV. O fortalecimento dos sindicatos e o início das lutas por direitos trabalhistas.\n\nEstão corretas as afirmativas:',
    options: [
      'I, II e III, apenas.',
      'I, II e IV, apenas.',
      'II, III e IV, apenas.',
      'I, II, III e IV.'
    ],
    correctAnswer: 1
  },
  {
    id: '87654321',
    subject: 'Biologia',
    text: 'As células são as unidades básicas da vida, responsáveis por todas as funções vitais dos organismos. Sobre as estruturas celulares e suas funções, analise as afirmações a seguir:\n\nI. As mitocôndrias são responsáveis pela produção de energia na forma de ATP através da respiração celular.\nII. O retículo endoplasmático rugoso está associado à síntese de proteínas.\nIII. Os lisossomos contêm enzimas digestivas e são responsáveis pela digestão intracelular.\nIV. O complexo de Golgi é responsável pela fotossíntese em células vegetais.\n\nEstão corretas as afirmativas:',
    options: [
      'I e II, apenas.',
      'I, II e III, apenas.',
      'II, III e IV, apenas.',
      'I, II, III e IV.'
    ],
    correctAnswer: 1
  },
  {
    id: '98765432',
    subject: 'Literatura',
    text: 'O Modernismo brasileiro foi um movimento artístico e cultural que se desenvolveu no Brasil na primeira metade do século XX, trazendo inovações significativas para a literatura, artes plásticas, música e arquitetura. Considerando as características e autores do Modernismo brasileiro, analise as afirmações a seguir:\n\nI. A Semana de Arte Moderna de 1922 é considerada o marco inicial do Modernismo no Brasil, reunindo artistas como Anita Malfatti, Tarsila do Amaral e Heitor Villa-Lobos.\nII. Oswald de Andrade e Mário de Andrade foram figuras centrais do movimento, contribuindo com obras como o "Manifesto Antropófago" e "Macunaíma", respectivamente.\nIII. O Modernismo brasileiro buscava uma ruptura com as formas tradicionais de expressão artística, valorizando a cultura nacional e a linguagem coloquial.\nIV. A segunda fase do Modernismo, conhecida como Geração de 30, teve como principais representantes Graciliano Ramos, Rachel de Queiroz e Jorge Amado, com obras focadas em questões sociais e regionais.\n\nEstão corretas as afirmativas:',
    options: [
      'I e II, apenas, pois o Modernismo brasileiro não valorizava a cultura nacional, preferindo imitar os movimentos europeus.',
      'II, III e IV, apenas, já que a Semana de Arte Moderna de 1922 não teve impacto significativo no desenvolvimento do movimento modernista no Brasil.',
      'I, II e III, apenas, considerando que a Geração de 30 não faz parte do movimento modernista brasileiro, sendo um movimento literário independente.',
      'I, II, III e IV, visto que todas as afirmações apresentam informações corretas sobre o Modernismo brasileiro e seus desdobramentos.'
    ],
    correctAnswer: 3
  }
]

export function QuestionsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false)
  const [direction, setDirection] = useState(0)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '5%' : '-5%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '5%' : '-5%',
      opacity: 0
    })
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="sticky top-0 z-10 bg-card p-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-xl font-bold">{currentQuestion.subject}</h1>
            <span className="text-muted-foreground text-sm">
              ID: {currentQuestion.id}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => {/* Implementar navegação para comentários */}}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto p-4 lg:p-6">
          <div className="mx-auto max-w-7xl h-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentQuestion.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className={`h-full flex flex-col ${isDesktop ? 'lg:flex-row lg:gap-8' : ''}`}
              >
                <div className={`mb-4 ${isDesktop ? 'lg:w-1/2 lg:mb-0' : 'flex-grow overflow-y-auto'}`}>
                  <ScrollArea className="h-full">
                    <h2 className="text-base lg:text-lg font-semibold mb-4">{currentQuestion.text}</h2>
                  </ScrollArea>
                </div>
                <div className={`${isDesktop ? 'lg:w-1/2 flex flex-col' : ''}`}>
                  <div className="space-y-2 flex-grow">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => !isAnswerConfirmed && setSelectedAnswer(index)}
                        className={`w-full p-3 rounded-lg text-left transition-colors flex items-start ${
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
                          isAnswerConfirmed && (index === currentQuestion.correctAnswer || index === selectedAnswer)
                            ? { scale: [1, 1.03, 1] }
                            : {}
                        }
                        transition={{ duration: 0.2 }}
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-bold mr-3 flex-shrink-0 text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-grow text-sm">{option}</span>
                        {isAnswerConfirmed && index === currentQuestion.correctAnswer && (
                          <CheckCircle className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />
                        )}
                        {isAnswerConfirmed && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                  {isDesktop && (
                    <div className="mt-4">
                      <Button
                        onClick={handleConfirmAnswer}
                        disabled={selectedAnswer === null || isAnswerConfirmed}
                        className="w-full py-2 text-base"
                      >
                        Confirmar Resposta
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {!isDesktop && (
          <div className="bg-card p-4 shadow-md">
            <Button
              onClick={handleConfirmAnswer}
              disabled={selectedAnswer === null || isAnswerConfirmed}
              className="w-full py-2 text-base"
            >
              Confirmar Resposta
            </Button>
          </div>
        )}
      </main>

      <footer className="bg-card p-4 shadow-md">
        <div className="mx-auto max-w-7xl flex items-center justify-between lg:justify-center lg:gap-4">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center text-sm"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
          </Button>
          <span className="text-muted-foreground text-sm font-medium">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <Button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            variant="outline"
            className="flex items-center text-sm"
          >
            Próxima <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  )
}