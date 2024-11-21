import { PrismaUserRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaUserRepository'
import { PayedUseCase } from './PayedUseCase'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const prismaUserRepository = new PrismaUserRepository(prisma)

const payedUseCase = new PayedUseCase(prismaUserRepository)

export { payedUseCase }
