import { CreateExamRequestDto } from "backupmonitoring.shared/DTOS/Exam/CreateExamDto";
import { IUseCase } from "backupmonitoring.shared/Interfaces/IUseCase";
import { AlternativeEntity } from "mauhel.api/src/domain/entities/AlternativeEntity";
import { BankEntity } from "mauhel.api/src/domain/entities/BankEntity";
import { ExamEntity } from "mauhel.api/src/domain/entities/ExamEntity";
import { InstituteEntity } from "mauhel.api/src/domain/entities/InstituteEntity";
import { QuestionEntity } from "mauhel.api/src/domain/entities/QuestionEntity";

export class createExamUseCase implements IUseCase<CreateExamRequestDto, void> {
    async execute({ level, position, year, bankName, instituteName }: CreateExamRequestDto): Promise<void> {

        const bancoFinded = BankEntity.with({
            id: 'ffff',
            name: bankName,
        })
        const instituteFinded = InstituteEntity.with({
            id: 'fssdf',
            name: instituteName,
        })

        const exam = ExamEntity.create({
            level,
            position,
            year,
            bank: bancoFinded,
            institute: instituteFinded
        })

        const question = QuestionEntity.create({
            statement: 'ableble',
            alternatives: [],
            examId: exam.id
        })
        exam.addQuestion(question)
        question.addAlternative(AlternativeEntity.create({
            content: 'conteudo',
            isCorrect: false,
            questionId: question.id
        }))

        // console.log(exam);
        // console.log(exam.quentions[0].alternatives);
        
    }
}

const main =  async () => {
    const teste = await new createExamUseCase().execute({
        level: 'level',
        position: 'pos',
        year: 2023,
        bankName: '8932-sfs-dds',
        instituteName: 'kjnsf-32nd-dnmd'
    })
    
    // console.log(teste);
}

main()
