import { Request, Response } from 'express'
import { createUserUseCase } from 'mauhel.api/src/application/useCases/User/CreateUser'
import { ZodError } from 'zod'

export async function createController(req: Request, res: Response) {
  try {
    const user = await createUserUseCase.execute(req.body)
    return res.status(201).json(user) // Retorna o usuário criado
  } catch (error: any) {
    if (error instanceof ZodError) {
      // Retorna erro 400 com detalhes do Zod
      return res.status(400).json({
        message: 'Validation error',
        issues: error.errors // Contém os detalhes do erro de validação
      })
    }

    if (error.message === 'Email already exist') {
      // Retorna erro 409 com mensagem de conflito
      return res.status(409).json({
        message: 'Email already exists'
      })
    }

    // Outros erros são tratados como erro interno do servidor
    console.error(error)
    return res.sendStatus(500)
  }
}
