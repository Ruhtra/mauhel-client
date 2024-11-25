import { z } from 'zod'
import { randomUUID } from 'crypto'

export type UserProps = {
  email: string
  passwordHash: string
  name: string
  birthDate?: Date
  profilePicture?: string
  idClientStripe?: string
}

type UserWithProps = UserProps & {
  id: string
  isSubscribed: boolean
  createdAt: Date
  updatedAt?: Date
}

export class UserEntity {
  public id: string
  public name: string
  public email: string
  public passwordHash: string
  public birthDate?: Date
  public profilePicture?: string
  public isSubscribed: boolean
  // uncouple
  public idClientStripe?: string

  public createdAt: Date
  public updatedAt?: Date

  private constructor(props: UserWithProps) {
    this.id = props.id
    this.email = props.email
    this.passwordHash = props.passwordHash
    this.name = props.name
    this.birthDate = props.birthDate
    this.profilePicture = props.profilePicture
    this.isSubscribed = props.isSubscribed
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  // Criar um novo usuário com valores padrão para `isSubscribed` e `createdAt`
  public static create(props: UserProps): UserEntity {
    UserEntity.createUserSchema.parse(props)

    return new UserEntity({
      ...props,
      id: randomUUID(),
      isSubscribed: false,
      createdAt: new Date(),
      updatedAt: undefined
    })
  }

  // Carregar uma entidade existente com todos os campos obrigatórios
  public static with(props: UserWithProps): UserEntity {
    return new UserEntity(props)
  }

  // Schemas Zod para validação
  static createUserSchema = z.object({
    email: z.string().email('Invalid email format'),
    passwordHash: z.string().min(6, 'Password must have at least 6 characters'),
    name: z.string().min(3, 'Name must have at least 3 characters'),
    birthDate: z.date().nullable().optional(),
    profilePicture: z.string().nullable().optional()
  })

  static updateUserSchema = z.object({
    email: z.string().email().nullable().optional(),
    passwordHash: z.string().min(6).nullable().optional(),
    name: z.string().min(3).nullable().optional(),
    birthDate: z.date().nullable().optional(),
    profilePicture: z.string().nullable().optional()
  })

  // Atualização de dados do usuário
  public updateUser(data: Partial<UserProps>): void {
    UserEntity.updateUserSchema.parse(data)

    if (data.email) this.email = data.email
    if (data.passwordHash) this.passwordHash = data.passwordHash
    if (data.name) this.name = data.name
    if (data.birthDate) this.birthDate = data.birthDate
    if (data.profilePicture) this.profilePicture = data.profilePicture

    this.updatedAt = new Date()
  }

  // Métodos de estado
  public markAsPaid(idClientStripe: string): void {
    if (!this.idClientStripe) this.idClientStripe = idClientStripe
    else if (idClientStripe != idClientStripe)
      throw new Error('idClient is not Equal')

    this.isSubscribed = true
    this.updatedAt = new Date()
  }

  public markAsUnpaid(idClientStripe: string): void {
    // if (idClientStripe != idClientStripe)
    //   throw new Error('idClient is not Equal')

    this.isSubscribed = false
    this.updatedAt = new Date()
  }
}
