import { allExamResponseDto } from 'backupmonitoring.shared/DTOS/Exam/allExamDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { IExamRepository } from 'mauhel.api/src/application/repositories/IExamRepository'

export class AllExamUseCase implements IUseCase<void, allExamResponseDto[]> {
  constructor(private examRepository: IExamRepository) {}
  async execute(): Promise<allExamResponseDto[]> {
    const exams = await this.examRepository.all()

    return exams.map(e => ({
      id: e.id,
      bank: {
        id: e.bank.id,
        name: e.bank.name
      },
      institute: {
        id: e.institute.id,
        name: e.institute.name
      },
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      level: e.level,
      position: e.position,
      year: e.year
    }))
  }
}
