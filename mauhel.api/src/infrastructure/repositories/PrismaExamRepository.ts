// src/infrastructure/repositories/PrismaUserRepository.ts
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { IExamRepository } from 'mauhel.api/src/application/repositories/IExamRepository'
import { BankEntity } from 'mauhel.api/src/domain/entities/BankEntity'
import { ExamEntity } from 'mauhel.api/src/domain/entities/ExamEntity'
import { InstituteEntity } from 'mauhel.api/src/domain/entities/InstituteEntity'
import { QuestionEntity } from 'mauhel.api/src/domain/entities/QuestionEntity'

export class PrismaExamRepository implements IExamRepository {
  constructor(
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {}
  create(exam: ExamEntity): Promise<ExamEntity> {
    throw new Error('Method not implemented.')
  }
  async all(): Promise<ExamEntity[]> {
    const exams = await this.prisma.exam.findMany({
      include: {
        bank: true,
        institute: true
      }
    })

    return exams.map(e => this.mapPrismaExamToDomain(e))
  }
  findById(examId: string): Promise<ExamEntity | null> {
    throw new Error('Method not implemented.')
  }

  private mapPrismaExamToDomain(prismaExam: any): ExamEntity {
    const bank = BankEntity.with({
      id: prismaExam.bank.id,
      name: prismaExam.bank.name
    })
    const institute = InstituteEntity.with({
      id: prismaExam.bank.id,
      name: prismaExam.bank.name
    })

    return ExamEntity.with({
      id: prismaExam.id,
      bank: bank,
      institute: institute,
      isComplete: prismaExam.isComplete,
      level: prismaExam.level,
      position: prismaExam.position,
      questionEntity: [],
      year: prismaExam.year,
      createdAt: prismaExam.createdAt,
      updatedAt: prismaExam.updatedAt
    })
  }
}
