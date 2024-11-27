import { AllUserResponseDto } from 'backupmonitoring.shared/DTOS/User/AllUserDto'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
export class AllUserUseCase implements IUseCase<void, AllUserResponseDto[]> {
  constructor(private userRepository: IUserRepository) {}
  async execute(): Promise<AllUserResponseDto[]> {
    const users = await this.userRepository.findAll()
    return users
  }
}
