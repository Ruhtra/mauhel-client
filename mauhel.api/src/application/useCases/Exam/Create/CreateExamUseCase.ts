import { CreateExamRequestDto } from 'backupmonitoring.shared/DTOS/Exam/CreateExamDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { AlternativeEntity } from 'mauhel.api/src/domain/entities/AlternativeEntity'
import { BankEntity } from 'mauhel.api/src/domain/entities/BankEntity'
import { DisciplineEntity } from 'mauhel.api/src/domain/entities/DisciplineEntity'
import { ExamEntity } from 'mauhel.api/src/domain/entities/ExamEntity'
import { InstituteEntity } from 'mauhel.api/src/domain/entities/InstituteEntity'
import { QuestionEntity } from 'mauhel.api/src/domain/entities/QuestionEntity'

export class createExamUseCase implements IUseCase<CreateExamRequestDto, void> {
  async execute({
    level,
    position,
    year,
    bankName,
    instituteName
  }: CreateExamRequestDto): Promise<void> {
    const bancoFinded = BankEntity.with({
      id: 'ffff',
      name: bankName
    })
    const instituteFinded = InstituteEntity.with({
      id: 'fssdf',
      name: instituteName
    })

    const exam = ExamEntity.create({
      level,
      position,
      year,
      bank: bancoFinded,
      institute: instituteFinded
    })
  }
}
