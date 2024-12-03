import { AddQuestionExamDto } from 'backupmonitoring.shared/DTOS/Exam/AddQuestionExamDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { IDisciplineRepository } from 'mauhel.api/src/application/repositories/IDisciplineRepository'
import { IExamRepository } from 'mauhel.api/src/application/repositories/IExamRepository'
import { DisciplineEntity } from 'mauhel.api/src/domain/entities/DisciplineEntity'
import { QuestionEntity } from 'mauhel.api/src/domain/entities/QuestionEntity'

export class AddQuestionUseCase implements IUseCase<AddQuestionExamDto, void> {
  constructor(
    private disciplineRepository: IDisciplineRepository,
    private examRepository: IExamRepository
  ) {}
  async execute({
    examId,
    statement,
    disciplineName,
    alternatives
  }: AddQuestionExamDto): Promise<void> {
    const exam = await this.examRepository.findById(examId)
    if (!exam) throw new Error('Exam not found')

    const discipline =
      (await this.disciplineRepository.findByName(disciplineName)) ??
      DisciplineEntity.create({ name: disciplineName })

    const question = QuestionEntity.create({
      examId: exam.id,
      statement: statement,
      discipline: discipline,
      alternatives: alternatives.map(e => ({
        content: e.content,
        isCorrect: e.isCorrect
      }))
    })

    exam.addQuestion(question)

    await this.examRepository.update(exam)
  }
}
