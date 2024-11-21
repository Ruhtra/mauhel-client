import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'

export interface IPayment {
  payWithSuccess(user: UserEntity): Promise<void>
  payNotSuccess(user: UserEntity): Promise<void>
}
