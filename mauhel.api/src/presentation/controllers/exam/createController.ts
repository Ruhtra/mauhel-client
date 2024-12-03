import { Request, Response } from 'express'
import { allUseCase } from 'mauhel.api/src/application/useCases/Exam/All'
import { createExamUseCase } from 'mauhel.api/src/application/useCases/Exam/Create'
import { ZodError } from 'zod'

export async function createController(req: Request, res: Response) {
  try {
    if (!req.user.hasPermission(['exam.create'])) return res.sendStatus(403)

    await createExamUseCase.execute(req.body)
    return res.status(201)
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
