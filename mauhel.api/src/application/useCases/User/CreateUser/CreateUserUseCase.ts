import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { CreateUserRequestDto } from 'backupmonitoring.shared/DTOS/User/CreateUserDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'

export class CreateUserUseCase implements IUseCase<CreateUserRequestDto, void> {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserRequestDto): Promise<void> {
    const userFinded = await this.userRepository.findByEmail(data.email)
    if (!!userFinded) throw new Error('Email already exist')

    const user = UserEntity.create({
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name,
      birthDate: data.birthDate,
      profilePicture: data.profilePicture
    })

    await this.userRepository.create(user)
  }
}
