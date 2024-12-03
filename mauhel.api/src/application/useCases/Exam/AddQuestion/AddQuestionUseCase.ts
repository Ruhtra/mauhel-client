import { AddQuestionExamDto } from 'backupmonitoring.shared/DTOS/Exam/AddQuestionExamDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { IExamRepository } from 'mauhel.api/src/application/repositories/IExamRepository'
import { DisciplineEntity } from 'mauhel.api/src/domain/entities/DisciplineEntity'
import { QuestionEntity } from 'mauhel.api/src/domain/entities/QuestionEntity'

export class AddQuestionUseCase implements IUseCase<AddQuestionExamDto, void> {
  constructor(private examRepository: IExamRepository) {}
  async execute({
    examId,
    statement,
    discipline,
    alternatives
  }: AddQuestionExamDto): Promise<void> {
    const exam = await this.examRepository.findById(examId)

    //simualndo busca no banco
    // const exam = ExamEntity.with({
    //   id: ExamId,
    //   bank: BankEntity.with({
    //     id: 'ale',
    //     name: 'nome'
    //   }),
    //   createdAt: new Date(),
    //   level: 'bald',
    //   institute: InstituteEntity.with({
    //     id: 'umid',
    //     name: 'insttitudo'
    //   }),
    //   isComplete: false,
    //   position: 's',
    //   year: 2024,
    //   questionEntity: []
    // })

    const question = QuestionEntity.create({
      examId: exam.id,
      statement: statement,
      discipline: DisciplineEntity.with({
        id: 'qw',
        name: discipline.name
      }),
      alternatives: alternatives.map(e => ({
        content: e.content,
        isCorrect: e.isCorrect
      }))
    })

    exam.addQuestion(question)
  }
}
