import {
  LoginUseCaseRequestDto,
  LoginuseCaseResponseDto
} from 'backupmonitoring.shared/DTOS/Login/LoginUseCase'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'
import { RoleType } from 'mauhel.api/src/domain/types/RoleType'
import { IUserRepository } from '../../repositories/IUserRepository'

export class LoginUseCase
  implements IUseCase<LoginUseCaseRequestDto, LoginuseCaseResponseDto>
{
  constructor(private userRepository: IUserRepository) {}
  async execute({
    email,
    password
  }: LoginUseCaseRequestDto): Promise<LoginuseCaseResponseDto> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) return null
    if (!user.comparePasswordEqual(password)) return null

    return {
      user
    }
  }
}
