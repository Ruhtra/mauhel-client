export interface AddQuestionExamDto {
  examId: string

  statement: string
  disciplineName: string
  alternatives: {
    content: string
    isCorrect: boolean
  }[]
}
