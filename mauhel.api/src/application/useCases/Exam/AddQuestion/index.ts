import { PrismaClient } from '@prisma/client'
import { PrismaExamRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaExamRepository'
import { AddQuestionUseCase } from './AddQuestionUseCase'
import { PrismaDisciplineRepository } from 'mauhel.api/src/infrastructure/repositories/DisciplineRepository.ts'

const prisma = new PrismaClient()
const prismaExamRepository = new PrismaExamRepository(prisma)
const prismaDisciplineRepository = new PrismaDisciplineRepository(prisma)

const addQuestionUseCase = new AddQuestionUseCase(
  prismaDisciplineRepository,
  prismaExamRepository
)

export { addQuestionUseCase }
