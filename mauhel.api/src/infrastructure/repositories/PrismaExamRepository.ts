// src/infrastructure/repositories/PrismaUserRepository.ts
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { IExamRepository } from 'mauhel.api/src/application/repositories/IExamRepository'
import { AlternativeEntity } from 'mauhel.api/src/domain/entities/AlternativeEntity'
import { BankEntity } from 'mauhel.api/src/domain/entities/BankEntity'
import { DisciplineEntity } from 'mauhel.api/src/domain/entities/DisciplineEntity'
import { ExamEntity } from 'mauhel.api/src/domain/entities/ExamEntity'
import { InstituteEntity } from 'mauhel.api/src/domain/entities/InstituteEntity'
import { QuestionEntity } from 'mauhel.api/src/domain/entities/QuestionEntity'

export class PrismaExamRepository implements IExamRepository {
  constructor(
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {}
  async create(exam: ExamEntity): Promise<void> {
    await this.prisma.exam.create({
      data: {
        id: exam.id,
        level: exam.level,
        position: exam.position,
        year: exam.year,
        bank: {
          connectOrCreate: {
            where: {
              name: exam.bank.name
            },
            create: {
              id: exam.id,
              name: exam.bank.name
            }
          }
        },
        institute: {
          connectOrCreate: {
            where: {
              name: exam.institute.name
            },
            create: {
              id: exam.id,
              name: exam.institute.name
            }
          }
        }
      }
    })
  }
  async all(): Promise<ExamEntity[]> {
    const exams = await this.prisma.exam.findMany({
      include: {
        bank: true,
        institute: true,
        questions: {
          include: {
            discipline: true,
            alternatives: true
          }
        }
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
      id: prismaExam.institute.id,
      name: prismaExam.institute.name
    })

    const questions = prismaExam.questions.map(e => {
      const alternatives = e.alternatives.map(e =>
        AlternativeEntity.with({
          content: e.content,
          createdAt: e.createdAt,
          id: e.id,
          isCorrect: e.isCorrect,
          questionId: e.questionId,
          updatedAt: e.updatedAt
        })
      )
      const discipline = DisciplineEntity.with({
        id: e.discipline.id,
        name: e.discipline.name
      })

      return QuestionEntity.with({
        id: e.id,
        statement: e.statement,
        alternatives: alternatives,
        discipline: discipline,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        examId: e.examId
      })
    })

    return ExamEntity.with({
      id: prismaExam.id,
      bank: bank,
      institute: institute,
      isComplete: prismaExam.isComplete,
      level: prismaExam.level,
      position: prismaExam.position,
      questionEntity: questions,
      year: prismaExam.year,
      createdAt: prismaExam.createdAt,
      updatedAt: prismaExam.updatedAt
    })
  }
}
