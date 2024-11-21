import { PayedRequestDto } from 'backupmonitoring.shared/DTOS/User/PayedDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { IUserRepository } from '../../repositories/IUserRepository'

export class PayedUseCase implements IUseCase<PayedRequestDto, void> {
  constructor(private userRepository: IUserRepository) {}

  async execute({ idUser }: PayedRequestDto): Promise<void> {
    const userFinded = await this.userRepository.findById(idUser)

    userFinded.markAsPaid()

    await this.userRepository.update(userFinded)
  }
}
