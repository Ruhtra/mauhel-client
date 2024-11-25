// src/infrastructure/repositories/PrismaUserRepository.ts
import { Prisma, PrismaClient } from '@prisma/client'
import { IUserRepository } from '../../application/repositories/IUserRepository'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { tuple } from 'zod'
import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'

export class PrismaUserRepository implements IUserRepository {
  constructor(
    private prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        name: user.name,
        birthDate: user.birthDate,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        isSubscribed: user.isSubscribed,
        idClientStripe: user.idClientStripe,
        updatetAt: user.updatedAt
      }
    })

    return this.mapPrismaUserToDomain(createdUser)
  }
  async update(user: UserEntity): Promise<UserEntity> {
    const response = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        birthDate: user.birthDate,
        email: user.email,
        name: user.name,
        passwordHash: user.passwordHash,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        isSubscribed: user.isSubscribed,
        idClientStripe: user.idClientStripe,
        updatetAt: user.updatedAt
      }
    })

    return this.mapPrismaUserToDomain(response)
  }

  async findById(userId: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })

    return user ? this.mapPrismaUserToDomain(user) : null
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    return user ? this.mapPrismaUserToDomain(user) : null
  }

  async findByUserStripe(userIdStripe: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { idClientStripe: userIdStripe }
    })

    return user ? this.mapPrismaUserToDomain(user) : null
  }

  private mapPrismaUserToDomain(prismaUser: any): UserEntity {
    return UserEntity.with({
      id: prismaUser.id,
      email: prismaUser.email,
      passwordHash: prismaUser.passwordHash,
      name: prismaUser.name,
      birthDate: prismaUser.birthDate,
      profilePicture: prismaUser.profilePicture,
      isSubscribed: prismaUser.isSubscribed,
      idClientStripe: prismaUser.idClientStripe,

      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt
    })
  }
}
