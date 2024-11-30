import { z } from 'zod'
import { randomUUID } from 'crypto'
import { AlternativeEntity, AlternativeProps } from './AlternativeEntity'

export type QuestionProps = {
    statement: string
    
    examId: string
    alternatives: AlternativeEntity[]
}

type QuestionWithProps = QuestionProps & {
  id: string

  createdAt: Date
  updatedAt?: Date  
}

export class QuestionEntity {
  public id: string

  public statement: string

  public createdAt: Date
  public updatedAt?: Date

  public examId: string
  public alternatives: AlternativeEntity[]
  

  private constructor(props: QuestionWithProps) {
    this.id = props.id

    this.statement = props.statement

    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt

    this.examId = props.examId
    this.alternatives = props.alternatives
  }

  public static create(props: QuestionProps): QuestionEntity {
    QuestionEntity.createQuestionSchema.parse(props)

    return new QuestionEntity({
      ...props,
      id: randomUUID(),

      statement: props.statement,

      createdAt: new Date(),
      updatedAt: undefined,
      
    })
  }

  public static with(props: QuestionWithProps): QuestionEntity {
    return new QuestionEntity(props)
  }

  static createQuestionSchema = z.object({
    
  })

  static updateQuestionSchema = z.object({
    
  })

  public updateQuestion(data: Partial<QuestionProps>): void {
    QuestionEntity.updateQuestionSchema.parse(data)

    this.updatedAt = new Date()
  }

  public addAlternative(alternative: AlternativeEntity) {
    this.alternatives.push(alternative)
  }
}
