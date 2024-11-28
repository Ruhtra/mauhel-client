import { PrismaUserRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaUserRepository'

import { PrismaClient } from '@prisma/client'
import { LoginUseCase } from './LoginUseCase'

const prisma = new PrismaClient()
const prismaUserRepository = new PrismaUserRepository(prisma)

const loginUseCase = new LoginUseCase(prismaUserRepository)

export { loginUseCase }
