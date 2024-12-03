import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { IDisciplineRepository } from 'mauhel.api/src/application/repositories/IDisciplineRepository'
import { DisciplineEntity } from 'mauhel.api/src/domain/entities/DisciplineEntity'

export class PrismaDisciplineRepository implements IDisciplineRepository {
  constructor(
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {}
  async findByName(disciplineName: string): Promise<DisciplineEntity | null> {
    const discipline = await this.prisma.discipline.findUnique({
      where: { name: disciplineName }
    })
    return discipline
  }
}
