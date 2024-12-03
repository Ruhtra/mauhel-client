export interface allExamResponseDto {
  id: string
  year: number
  position: string
  level: string

  //   quentions: QuestionEntity[]

  bank: string
  institute: string

  createdAt: Date
  updatedAt?: Date
}
