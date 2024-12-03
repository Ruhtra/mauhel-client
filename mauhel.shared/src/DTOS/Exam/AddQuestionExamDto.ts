export interface AddQuestionExamDto {
  examId: string

  statement: string
  discipline: {
    name: string
  }
  alternatives: {
    content: string
    isCorrect: boolean
  }[]
}
