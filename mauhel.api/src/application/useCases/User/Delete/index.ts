import { PrismaUserRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaUserRepository'
import { PrismaClient } from '@prisma/client'
import { DeleteUserUseCase } from './DeleteUserUseCase'

const prisma = new PrismaClient()
const prismaUserRepository = new PrismaUserRepository(prisma)

const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepository)

export { deleteUserUseCase }
