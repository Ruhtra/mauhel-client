export interface allExamResponseDto {
  id: string
  year: number
  position: string
  level: string

  quentions: {
    id: string
    statement: string
    alternatives: {
      content: string
      isCorrect: boolean
    }[]
  }[]

  bank: {
    id: string
    name: string
  }
  institute: {
    id: string
    name: string
  }

  createdAt: Date
  updatedAt?: Date
}
