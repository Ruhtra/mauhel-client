import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../application/repositories/IUserRepository";
import { UserEntity } from "../../domain/entities/UserEntity";

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Salva um novo usuário no banco
  async save(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        id: user.id, // O ID gerado pelo Prisma é numérico
        name: user.name,
        email: user.email,
        birthDate: user.birthDate,
        profileImage: user.profileImage,
        role: user.role,
        createdAt: user.createdAt,
        password: user.password, // Certifique-se que isso está encriptado!
      },
    });

    // Retornamos um UserEntity com os dados criados
    return new UserEntity(
      {
        name: createdUser.name,
        email: createdUser.email,
        birthDate: createdUser.birthDate,
        profileImage: createdUser.profileImage || undefined,
        password: createdUser.password,
      },
      createdUser.id.toString(),
      createdUser.role as any // Tipagem do Prisma para Role
    );
  }

  // Busca por usuário pelo e-mail
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    // Retornamos a entidade caso exista
    return new UserEntity(
      {
        name: user.name,
        email: user.email,
        birthDate: user.birthDate,
        profileImage: user.profileImage || undefined,
        password: user.password,
      },
      user.id.toString(),
      user.role as any
    );
  }
}
