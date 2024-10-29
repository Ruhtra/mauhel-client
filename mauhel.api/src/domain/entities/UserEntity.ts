import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Enum para Role
export enum Role {
  PROFESSOR = "PROFESSOR",
  ALUNO = "ALUNO",
  GERENTE = "GERENTE",
}

// Definindo as propriedades para construção
type UserProps = {
  name: string;
  email: string;
  birthDate: Date;
  profileImage?: string;
  password: string;
};

export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public birthDate: Date;
  public profileImage?: string;
  public password: string;
  public role: Role;
  public createdAt: Date;

  constructor(props: UserProps, id?: string, role: Role = Role.ALUNO) {
    // Validação das propriedades de entrada
    UserEntity.createUserSchema.parse({ ...props, role });

    // Atribuição das propriedades
    this.id = id || uuidv4(); // Gera o ID aqui, se não for passado
    this.createdAt = new Date(); // Atribui a data de criação como a atual
    this.role = role; // Se não passar nada, o padrão é ALUNO

    // Outras propriedades
    this.name = props.name;
    this.email = props.email;
    this.birthDate = props.birthDate;
    this.password = props.password;
    this.profileImage = props.profileImage;
  }

  // Schemas Zod para validação
  static createUserSchema = z.object({
    name: z.string().min(3, "Name must have at least 3 characters"),
    email: z.string().email("Invalid email format"),
    birthDate: z.date(),
    password: z.string().min(6, "Password must have at least 6 characters"),
    profileImage: z.string().optional(),
    role: z.nativeEnum(Role),
  });

  static updateUserSchema = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    birthDate: z.date().optional(),
    profileImage: z.string().optional(),
    role: z.nativeEnum(Role).optional(),
  });

  // Métodos de atualização...
  // updateName, updateEmail, etc.

  // Método para calcular a idade
  public getAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
}
