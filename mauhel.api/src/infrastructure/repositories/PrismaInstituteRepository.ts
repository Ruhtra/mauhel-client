// src/infrastructure/repositories/PrismaUserRepository.ts
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { IInstituteRepository } from 'mauhel.api/src/application/repositories/IInstituteRepository'
import { InstituteEntity } from 'mauhel.api/src/domain/entities/InstituteEntity'

export class PrismaInstituteRepository implements IInstituteRepository {
  constructor(
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {}
  async findByName(instituteName: string): Promise<InstituteEntity | null> {
    const institute = await this.prisma.institute.findUnique({
      where: { name: instituteName }
    })
    return institute
  }
}
