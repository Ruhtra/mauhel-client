import { CreateExamRequestDto } from "backupmonitoring.shared/DTOS/Exam/CreateExamDto";
import { IUseCase } from "backupmonitoring.shared/Interfaces/IUseCase";
import { BankEntity } from "mauhel.api/src/domain/entities/BankEntity";
import { ExamEntity } from "mauhel.api/src/domain/entities/ExamEntity";
import { InstituteEntity } from "mauhel.api/src/domain/entities/InstituteEntity";

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

        console.log(exam);
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
    
    console.log(teste);
}

main()
