import { CreateUserUseCase } from "../application/useCases/User/CreateUserUseCase";
import { PrismaUserRepository } from "../infrastructure/repositories/IUserPrismaRepository";

const iUserRepository = new PrismaUserRepository();
const createUserUseCase = new CreateUserUseCase(iUserRepository);

createUserUseCase.execute({
  birthDate: new Date(),
  email: "kawanarthurskate@gmail.com",
  name: "Um nome",
  password: "umasenha",
  profileImage: "https://image.com.br/endereco",
});
