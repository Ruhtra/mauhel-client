import { Request, Response } from 'express'
import { addQuestionUseCase } from 'mauhel.api/src/application/useCases/Exam/AddQuestion'
import { ZodError } from 'zod'

export async function addQuestionController(req: Request, res: Response) {
  try {
    if (!req.user.hasPermission(['exam.addQuestion']))
      return res.sendStatus(403)

    await addQuestionUseCase.execute(req.body)
    return res.status(201)
  } catch (error) {
    if (error instanceof ZodError) {
      // Retorna erro 400 com detalhes do Zod
      return res.status(400).json({
        message: 'Validation error',
        issues: error.errors // Contém os detalhes do erro de validação
      })
    }

    if (error.message === 'Exam not found') {
      return res.status(404).json({
        message: 'Exam Not found'
      })
    }

    // Outros erros são tratados como erro interno do servidor
    console.error(error)
    return res.sendStatus(500)
  }
}
