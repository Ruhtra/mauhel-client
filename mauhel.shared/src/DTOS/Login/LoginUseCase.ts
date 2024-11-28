import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'

export class LoginUseCaseRequestDto {
  email: string
  password: string
}
export class LoginuseCaseResponseDto {
  user: UserEntity
}
