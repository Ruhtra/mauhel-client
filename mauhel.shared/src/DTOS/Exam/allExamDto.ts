export interface allExamResponseDto {
  id: string
  year: number
  position: string
  level: string

  //   quentions: QuestionEntity[]

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
