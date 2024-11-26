import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'
import { IUserRepository } from '../../../repositories/IUserRepository'
import {
  CreateUserRequestDto,
  CreateUserRequestSchema
} from 'backupmonitoring.shared/DTOS/User/CreateUserDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { RoleType } from 'mauhel.api/src/domain/types/RoleType'

export class CreateUserUseCase implements IUseCase<CreateUserRequestDto, void> {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserRequestDto): Promise<void> {
    const body = CreateUserRequestSchema.parse(data)

    console.log(body)

    const userFinded = await this.userRepository.findByEmail(data.email)
    if (!!userFinded) throw new Error('Email already exist')

    const user = UserEntity.create({
      name: body.name,
      email: body.email,
      role: RoleType[body.role.toUpperCase()],
      birthDate: body.birthDate,
      profilePicture: body.profilePicture,
      passwordHash: body.password
    })

    await this.userRepository.create(user)
  }
}
