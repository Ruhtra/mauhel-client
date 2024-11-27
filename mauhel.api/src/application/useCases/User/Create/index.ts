import { PrismaUserRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaUserRepository'
import { CreateUserUseCase } from './CreateUserUseCase'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const prismaUserRepository = new PrismaUserRepository(prisma)

const createUserUseCase = new CreateUserUseCase(prismaUserRepository)

export { createUserUseCase }
