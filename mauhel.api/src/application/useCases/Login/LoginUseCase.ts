import {
  LoginUseCaseRequestDto,
  LoginuseCaseResponseDto
} from 'backupmonitoring.shared/DTOS/Login/LoginUseCase'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'

export class LoginUseCase
  implements IUseCase<LoginUseCaseRequestDto, LoginuseCaseResponseDto>
{
  async execute({}: LoginUseCaseRequestDto): Promise<LoginuseCaseResponseDto> {
    throw new Error('Method not implemented.')
  }
}
