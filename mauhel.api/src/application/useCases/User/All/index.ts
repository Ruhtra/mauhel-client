import { PrismaUserRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaUserRepository'

import { PrismaClient } from '@prisma/client'
import { AllUserUseCase } from './AllUserUseCase'

const prisma = new PrismaClient()
const prismaUserRepository = new PrismaUserRepository(prisma)

const allUserUseCase = new AllUserUseCase(prismaUserRepository)

export { allUserUseCase }
