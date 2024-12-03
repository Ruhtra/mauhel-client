import { z } from 'zod'
import { randomUUID } from 'crypto'

export type BankProps = {
  name: string
}

type BankWithProps = BankProps & {
  id: string
}

export class BankEntity {
  public id: string
  public name: string

  private constructor(props: BankWithProps) {
    this.id = props.id
    this.name = props.name
  }

  public static create(props: BankProps): BankEntity {
    BankEntity.createBankSchema.parse(props)

    return new BankEntity({
      ...props,
      id: randomUUID()
    })
  }

  public static with(props: BankWithProps): BankEntity {
    return new BankEntity(props)
  }

  static createBankSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo')
  })
}
