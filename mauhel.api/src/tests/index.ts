// // import { CreateUserUseCase } from '../application/useCases/User/CreateUserUseCase'
// // import { PrismaUserRepository } from '../infrastructure/repositories/IUserPrismaRepository'

// import { PaymentsEfi } from "../application/services/PaymentsEfi";
// import { env } from "../presentation/env";

// // const iUserRepository = new PrismaUserRepository()
// // const createUserUseCase = new CreateUserUseCase(iUserRepository)

// // createUserUseCase.execute({
// //   birthDate: new Date(),
// //   email: 'kawanarthurskate@gmail.com',
// //   name: 'Um nome',
// //   password: 'umasenha',
// //   profileImage: 'https://image.com.br/endereco'
// // })

// const payment = new PaymentsEfi({
//   client_id: env.client_id,
//   client_secret: env.client_secret,
//   sandbox: env.sandbox
// })

// payment.listPlans()
// // payment.listSubscriptions()
// // payment.temp()
// // payment.payWithCard()
// //payment.temp()

// // payment.payWithBolix()
