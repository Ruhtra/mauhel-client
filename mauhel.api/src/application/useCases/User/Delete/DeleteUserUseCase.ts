import {
  DeleteUserRequestDto,
  DeleteUserRequestSchema
} from 'backupmonitoring.shared/DTOS/User/DeleteUserDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { IUserRepository } from 'mauhel.api/src/application/repositories/IUserRepository'

export class DeleteUserUseCase implements IUseCase<DeleteUserRequestDto, void> {
  constructor(private userRepository: IUserRepository) {}
  async execute({ idUser }: DeleteUserRequestDto): Promise<void> {
    const parse = DeleteUserRequestSchema.parse({ idUser })
    await this.userRepository.delete(parse.idUser)
  }
}
