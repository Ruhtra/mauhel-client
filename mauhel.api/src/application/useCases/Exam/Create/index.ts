import { PrismaClient } from '@prisma/client'
import { CreateExamUseCase } from './CreateExamUseCase'
import { PrismaExamRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaExamRepository'
import { PrismaBankRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaBankRepository'
import { PrismaInstituteRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaInstituteRepository'

const prisma = new PrismaClient()
const prismaBankRepository = new PrismaBankRepository(prisma)
const prismaInstituteRepository = new PrismaInstituteRepository(prisma)
const prismaExamRepository = new PrismaExamRepository(prisma)

const createExamUseCase = new CreateExamUseCase(
  prismaBankRepository,
  prismaInstituteRepository,
  prismaExamRepository
)

export { createExamUseCase }
