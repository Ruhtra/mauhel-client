import { z } from 'zod'
import { randomUUID } from 'crypto'

export type UserProps = {
  email: string
  name: string
  birthDate?: Date

  username: string
  provider: string
  googleId: string
  role: string
  profilePicture?: string
}

type UserWithProps = UserProps & {
  id: string
  isSubscribed: boolean
  idClientStripe?: string

  createdAt: Date
  updatedAt?: Date
}

export class UserEntity {
  public id: string
  public name: string
  public username: string
  public email: string
  public birthDate?: Date
  //isso sai ja daqui
  public provider: string
  public googleId: string
  public role: string
  public profilePicture?: string
  //até aqui
  public isSubscribed: boolean
  // uncouple
  public idClientStripe?: string

  public createdAt: Date
  public updatedAt?: Date

  private constructor(props: UserWithProps) {
    this.id = props.id
    this.email = props.email
    this.name = props.name
    this.birthDate = props.birthDate
    this.username = props.username
    this.provider = props.provider
    this.googleId = props.provider
    this.role = props.provider
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
    name: z.string().min(3, 'Name must have at least 3 characters'),
    username: z.string().min(1),
    provider: z.string().min(1),
    googleId: z.string().min(1),
    role: z.string().min(1),
    birthDate: z.date().nullable().optional(),
    profilePicture: z.string().nullable().optional()
  })

  static updateUserSchema = z.object({
    email: z.string().email().nullable().optional(),
    name: z.string().min(3).nullable().optional(),
    username: z.string().nullable().optional(),
    provider: z.string().nullable().optional(),
    googleId: z.string().nullable().optional(),
    role: z.string().nullable().optional(),
    birthDate: z.date().nullable().optional(),
    profilePicture: z.string().nullable().optional()
  })

  // Atualização de dados do usuário
  public updateUser(data: Partial<UserProps>): void {
    UserEntity.updateUserSchema.parse(data)

    if (data.email) this.email = data.email
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
