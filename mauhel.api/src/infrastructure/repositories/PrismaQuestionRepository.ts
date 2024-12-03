// src/infrastructure/repositories/PrismaUserRepository.ts
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { IQuestionRepository } from 'mauhel.api/src/application/repositories/IQuestionRepository'
import { QuestionEntity } from 'mauhel.api/src/domain/entities/QuestionEntity'
import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'

export class PrismaQuestionRepository implements IQuestionRepository {
  constructor(
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {}
  create(question: QuestionEntity): Promise<QuestionEntity> {
    throw new Error('Method not implemented.')
  }
  findById(questionId: string): Promise<QuestionEntity | null> {
    throw new Error('Method not implemented.')
  }
}
