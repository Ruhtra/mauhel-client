import { z } from 'zod'
import { randomUUID } from 'crypto'

export type DisciplineProps = {
    name: string
}

type DisciplineWithProps = DisciplineProps & {
  id: string
  name: string
}

export class DisciplineEntity {
  public id: string
    public name: string

  private constructor(props: DisciplineWithProps) {
    this.id = props.id
    this.name = props.name
  }

  public static create(props: DisciplineProps): DisciplineEntity {
    DisciplineEntity.createDisciplineSchema.parse(props)

    return new DisciplineEntity({
      ...props,
      id: randomUUID(),

    })
  }

  public static with(props: DisciplineWithProps): DisciplineEntity {
    return new DisciplineEntity(props)
  }

  static createDisciplineSchema = z.object({
    
  })

}
