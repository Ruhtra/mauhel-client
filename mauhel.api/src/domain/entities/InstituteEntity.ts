import { z } from 'zod'
import { randomUUID } from 'crypto'

export type InstituteProps = {
    name: string
}

type InstituteWithProps = InstituteProps & {
  id: string
}

export class InstituteEntity {
  public id: string
  public name: string

  private constructor(props: InstituteWithProps) {
    this.id = props.id
    this.name = props.name
  }

  public static create(props: InstituteProps): InstituteEntity {
    InstituteEntity.createInstituteSchema.parse(props)

    return new InstituteEntity({
      ...props,
      id: randomUUID(),
    })
  }

  public static with(props: InstituteWithProps): InstituteEntity {
    return new InstituteEntity(props)
  }

  static createInstituteSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório").max(255, "Nome muito longo")
  })
}
