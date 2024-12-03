import { PrismaClient } from '@prisma/client'
import { AllExamUseCase } from './AllExamUseCase'
import { PrismaExamRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaExamRepository'

const prisma = new PrismaClient()
const prismaExamRepository = new PrismaExamRepository(prisma)

const allUseCase = new AllExamUseCase(prismaExamRepository)

export { allUseCase }
