import { z } from 'zod'
import { randomUUID } from 'crypto'

export type AlternativeProps = {
    content: string
    isCorrect: boolean

    questionId: string
}

type AlternativeWithProps = AlternativeProps & {
  id: string

  createdAt: Date
  updatedAt?: Date
}

export class AlternativeEntity {
  public id: string
  
  public content: string
  public isCorrect: boolean

  public createdAt: Date
  public updatedAt?: Date

  public questionId: string

  private constructor(props: AlternativeWithProps) {
    this.id = props.id

    this.content = props.content
    this.isCorrect = props.isCorrect

    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt

    this.questionId = props.questionId
  }

  public static create(props: AlternativeProps): AlternativeEntity {
    AlternativeEntity.createAlternativeSchema.parse(props)

    return new AlternativeEntity({
      ...props,
      id: randomUUID(),

      createdAt: new Date(),
      updatedAt: undefined,
    })
  }

  public static with(props: AlternativeWithProps): AlternativeEntity {
    return new AlternativeEntity(props)
  }

  static createAlternativeSchema = z.object({
    
  })

  static updateAlternativeSchema = z.object({
    
  })

  public updateAlternative(data: Partial<AlternativeProps>): void {
    AlternativeEntity.updateAlternativeSchema.parse(data)

    this.updatedAt = new Date()
  }

}
