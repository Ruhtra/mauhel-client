// src/application/repositories/IUserRepository.ts

import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>
  findByEmail(email: string): Promise<UserEntity | null>
  findById(userId: string): Promise<UserEntity | null>
  update(user: UserEntity): Promise<UserEntity>
}
