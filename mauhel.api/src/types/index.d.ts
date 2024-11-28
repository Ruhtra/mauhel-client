import { Token } from 'backupmonitoring.shared/token'
import { UserEntity } from '../domain/entities/UserEntity'

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
