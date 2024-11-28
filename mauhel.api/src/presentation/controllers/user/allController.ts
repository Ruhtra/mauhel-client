import { Request, Response } from 'express'
import { allUserUseCase } from 'mauhel.api/src/application/useCases/User/All'
import { ZodError } from 'zod'

export async function allController(req: Request, res: Response) {
  try {
    const users = await allUserUseCase.execute()
    return res.status(200).json(users)
  } catch (error) {
    if (error instanceof ZodError) {
      // Retorna erro 400 com detalhes do Zod
      return res.status(400).json({
        message: 'Validation error',
        issues: error.errors // Contém os detalhes do erro de validação
      })
    }
    // Outros erros são tratados como erro interno do servidor
    console.error(error)
    return res.sendStatus(500)
  }
}
