import { IUserRepository } from '../../repositories/IUserRepository'
import { UserEntity } from '../../../domain/entities/UserEntity'
import { z } from 'zod'

// Definição do DTO de entrada para criar o usuário
const createUserDtoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  birthDate: z.date(),
  password: z.string().min(6),
  profileImage: z.string().optional(),
  role: z.enum(['PROFESSOR', 'ALUNO', 'GERENTE']).optional()
})

type CreateUserDto = z.infer<typeof createUserDtoSchema>

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  // Método principal para criar o usuário
  public async execute(input: CreateUserDto): Promise<UserEntity> {
    // Validação do DTO de entrada
    const data = createUserDtoSchema.parse(input)

    // Verificar se o e-mail já está em uso
    const existingUser = await this.userRepository.findByEmail(data.email)
    if (existingUser) {
      throw new Error('Email already in use')
    }

    // Criar entidade de usuário
    const user = new UserEntity({
      name: data.name,
      email: data.email,
      birthDate: data.birthDate,
      password: data.password,
      profileImage: data.profileImage
    })

    // Salvar o usuário usando o repositório
    return this.userRepository.save(user)
  }
}
