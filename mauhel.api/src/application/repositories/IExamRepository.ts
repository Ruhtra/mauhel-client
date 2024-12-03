import { ExamEntity } from 'mauhel.api/src/domain/entities/ExamEntity'

export interface IExamRepository {
  create(exam: ExamEntity): Promise<ExamEntity>
  all(): Promise<ExamEntity[]>
  findById(examId: string): Promise<ExamEntity | null>
}
