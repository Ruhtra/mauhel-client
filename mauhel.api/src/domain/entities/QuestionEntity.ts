import { z } from 'zod'
import { randomUUID } from 'crypto'
import { ExamEntity } from './ExamEntity'
import { AlternativeEntity } from './AlternativeEntity'

export type QuestionProps = {
    statement: string
    exam: ExamEntity
    alternatives: {
        content: string
        isCorrect: boolean
    }[]
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

  public exam: ExamEntity
  public alternatives: AlternativeEntity[]
  

  private constructor(props: QuestionWithProps) {
    this.id = props.id

    this.statement = props.statement

    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt

    this.exam = props.exam    
    this.alternatives = props.alternatives.map(e => AlternativeEntity.create({
        question: this,
        content: e.content,
        isCorrect: e.isCorrect
    }))
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

}
