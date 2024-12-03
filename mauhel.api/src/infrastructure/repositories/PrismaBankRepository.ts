// src/infrastructure/repositories/PrismaUserRepository.ts
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { IBankRepository } from 'mauhel.api/src/application/repositories/IBankRepository'
import { BankEntity } from 'mauhel.api/src/domain/entities/BankEntity'

export class PrismaBankRepository implements IBankRepository {
  constructor(
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {}
  async findByName(bankName: string): Promise<BankEntity | null> {
    const bank = await this.prisma.bank.findUnique({
      where: { name: bankName }
    })
    return bank
  }
}
