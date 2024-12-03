import { BankEntity } from 'mauhel.api/src/domain/entities/BankEntity'

export interface IBankRepository {
  findByName(bankName: string): Promise<BankEntity | null>
}
