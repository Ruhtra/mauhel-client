import { z } from 'zod'
import { randomUUID } from 'crypto'
import { BankEntity } from './BankEntity'
import { InstituteEntity } from './InstituteEntity'
import { QuestionEntity } from './QuestionEntity'
import { AlternativeEntity } from './AlternativeEntity'

export type ExamProps = {
  year: number
  position: string
  level: string

  bank: BankEntity
  institute: InstituteEntity
}

type ExamWithProps = ExamProps & {
  id: string

  isComplete: boolean
  questionEntity: QuestionEntity[]

  createdAt: Date
  updatedAt?: Date
}

export class ExamEntity {
  public id: string
  public year: number
  public position: string
  public level: string

  public quentions: QuestionEntity[]

  public bank: BankEntity
  public institute: InstituteEntity

  public createdAt: Date
  public updatedAt?: Date

  private constructor(props: ExamWithProps) {
    this.id = props.id
    this.year = props.year
    this.position = props.position
    this.level = props.level
  
    this.quentions = props.questionEntity
    this.bank = props.bank
    this.institute = props.institute

    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  public static create(props: ExamProps): ExamEntity {
    ExamEntity.createExamSchema.parse(props)

    return new ExamEntity({
      ...props,
      id: randomUUID(),

      isComplete: false,
      questionEntity: [],

      createdAt: new Date(),
      updatedAt: undefined
    })
  }

  public static with(props: ExamWithProps): ExamEntity {
    return new ExamEntity(props)
  }
  static createExamSchema = z.object({
    year: z.number().min(1900).max(new Date().getFullYear()), // Valida ano
    position: z.string().min(1, "Position é obrigatório").max(255, "Position muito longa"), // Valida posição
    level: z.string().min(1, "Level é obrigatório").max(255, "Level muito longo"), // Valida nível
    bank: BankEntity.createBankSchema,
    institute: InstituteEntity.createInstituteSchema
  });

  static updateExamSchema = z.object({

  })

  public updateExam(data: Partial<ExamProps>): void {
    ExamEntity.updateExamSchema.parse(data)

    this.updatedAt = new Date()
  }

  public addQuestion(question: QuestionEntity) {
    this.quentions.push(question)
  }

}
