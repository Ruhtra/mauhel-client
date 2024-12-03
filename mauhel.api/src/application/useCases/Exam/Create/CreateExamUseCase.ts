import { CreateExamRequestDto } from 'backupmonitoring.shared/DTOS/Exam/CreateExamDto'
import { IUseCase } from 'backupmonitoring.shared/Interfaces/IUseCase'
import { IBankRepository } from 'mauhel.api/src/application/repositories/IBankRepository'
import { IExamRepository } from 'mauhel.api/src/application/repositories/IExamRepository'
import { IInstituteRepository } from 'mauhel.api/src/application/repositories/IInstituteRepository'
import { BankEntity } from 'mauhel.api/src/domain/entities/BankEntity'
import { ExamEntity } from 'mauhel.api/src/domain/entities/ExamEntity'
import { InstituteEntity } from 'mauhel.api/src/domain/entities/InstituteEntity'

export class CreateExamUseCase implements IUseCase<CreateExamRequestDto, void> {
  constructor(
    private bankRepository: IBankRepository,
    private instituteRepository: IInstituteRepository,
    private examRepository: IExamRepository
  ) {}
  async execute({
    level,
    position,
    year,
    bankName,
    instituteName
  }: CreateExamRequestDto): Promise<void> {
    const bank =
      (await this.bankRepository.findByName(bankName)) ??
      BankEntity.create({
        name: bankName
      })
    const institute =
      (await this.instituteRepository.findByName(instituteName)) ??
      InstituteEntity.create({
        name: instituteName
      })

    const exam = ExamEntity.create({
      level,
      position,
      year,
      bank: bank,
      institute: institute
    })

    await this.examRepository.create(exam)
  }
}
