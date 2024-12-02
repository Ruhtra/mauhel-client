import { AddQuestionExamDto } from "backupmonitoring.shared/DTOS/Exam/AddQuestionExamDto";
import { IUseCase } from "backupmonitoring.shared/Interfaces/IUseCase";
import { BankEntity } from "mauhel.api/src/domain/entities/BankEntity";
import { ExamEntity } from "mauhel.api/src/domain/entities/ExamEntity";
import { InstituteEntity } from "mauhel.api/src/domain/entities/InstituteEntity";
import { QuestionEntity } from "mauhel.api/src/domain/entities/QuestionEntity";

export class AddQuestionUseCase implements IUseCase<AddQuestionExamDto, void> {
    async execute({ExamId, statement, alternatives}: AddQuestionExamDto): Promise<void> {

        //simualndo busca no banco
        const exam = ExamEntity.with({
            id: ExamId,
            bank: BankEntity.with({
                id: 'ale',
                name: 'nome'
            }),
            createdAt: new Date(),
            level: 'bald',
            institute: InstituteEntity.with({
                id: 'umid',
                name: 'insttitudo'
            }),
            isComplete: false,
            position: 's',
            year: 2024,
            questionEntity: []
        })

        const question = QuestionEntity.create({
            examId: exam.id,
            statement: statement,
            alternatives: alternatives.map(e => ({
                content: e.content,
                isCorrect: e.isCorrect
            }))
        })

        exam.addQuestion(question)
    }
}