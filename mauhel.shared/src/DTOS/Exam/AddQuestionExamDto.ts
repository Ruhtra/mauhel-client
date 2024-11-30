export interface AddQuestionExamDto {
    ExamId: string

    statement: string
    alternatives: {
        content: string
        isCorrect: boolean
    }[]
}