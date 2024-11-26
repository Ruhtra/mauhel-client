import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'
import { IUserRepository } from '../../../repositories/IUserRepository'
import { CreateUserRequestDto } from 'backupmonitoring.shared/DTOS/User/CreateUserDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { RoleType } from 'mauhel.api/src/domain/types/RoleType'

export class CreateUserUseCase implements IUseCase<CreateUserRequestDto, void> {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserRequestDto): Promise<void> {
    const userFinded = await this.userRepository.findByEmail(data.email)
    if (!!userFinded) throw new Error('Email already exist')

    const user = UserEntity.create({
      name: data.name,
      email: data.email,
      role: RoleType[data.role.toUpperCase() as keyof typeof RoleType],
      birthDate: data.birthDate,
      profilePicture: data.profilePicture,
      passwordHash: data.password
    })

    await this.userRepository.create(user)
  }
}
