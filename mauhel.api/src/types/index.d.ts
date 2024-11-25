import { UserEntity } from '../domain/entities/UserEntity'

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
