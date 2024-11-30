import { AddQuestionExamDto } from "backupmonitoring.shared/DTOS/Exam/AddQuestionExamDto";
import { IUseCase } from "backupmonitoring.shared/Interfaces/IUseCase";
import { AlternativeEntity } from "mauhel.api/src/domain/entities/AlternativeEntity";
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
            alternatives: []
        })

        const alternativesent =  alternatives.map(e => AlternativeEntity.create({
            content: e.content,
            isCorrect: e.isCorrect,
            questionId: question.id
        }))
        alternativesent.forEach(e => question.addAlternative(e))

        exam.addQuestion(question)

        console.log(exam);
        console.log(exam.quentions[0].alternatives);
        
    }
}



const main =  async () => {
    new AddQuestionUseCase().execute({
        alternatives: [{
            content: 'conteudo',
            isCorrect: false
        }],
        ExamId: 'ksnkfs',
        statement: 'statement'
    })

}

main()
