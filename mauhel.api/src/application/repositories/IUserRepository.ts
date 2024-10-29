import { UserEntity } from '../../domain/entities/UserEntity'

// Contrato de repositório para a entidade User
export interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>
  findByEmail(email: string): Promise<UserEntity | null>
}
