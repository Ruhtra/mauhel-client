import { UnpayedDtoRequestDto } from 'backupmonitoring.shared/DTOS/User/UnpayedDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { IUserRepository } from '../../repositories/IUserRepository'

export class UnpayedUseCase implements IUseCase<UnpayedDtoRequestDto, void> {
  constructor(private userRepository: IUserRepository) {}

  async execute({ idClientStripe }: UnpayedDtoRequestDto): Promise<void> {
    const userFinded =
      await this.userRepository.findByUserStripe(idClientStripe)

    userFinded.markAsUnpaid(idClientStripe)

    await this.userRepository.update(userFinded)
  }
}
