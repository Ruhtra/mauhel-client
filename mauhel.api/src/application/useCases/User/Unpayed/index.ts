import { PrismaUserRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaUserRepository'
import { UnpayedUseCase } from './UnpayedUseCase'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const prismaUserRepository = new PrismaUserRepository(prisma)

const unpayedUseCase = new UnpayedUseCase(prismaUserRepository)

export { unpayedUseCase }
