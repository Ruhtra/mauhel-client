import { Router } from 'express'
import { deleteUserUseCase } from 'mauhel.api/src/application/useCases/User/Delete'
import { ZodError } from 'zod'

export const deleteUserRouter = Router()

deleteUserRouter.delete('/delete/:idUser', async (req, res) => {
  try {
    console.log(req.params)
    console.log(req.query)

    await deleteUserUseCase.execute(req.params)
    return res.sendStatus(204) // Nenhum conteúdo
  } catch (error) {
    if (error instanceof ZodError) {
      // Retorna erro 400 com detalhes do Zod
      return res.status(400).json({
        message: 'Validation error',
        issues: error.errors // Contém os detalhes do erro de validação
      })
    }

    // if (error.message === 'User not found') {
    //   // Retorna erro 409 com mensagem de conflito
    //   return res.status(404).json({
    //     message: 'User Not found'
    //   })
    // }

    // Outros erros são tratados como erro interno do servidor
    console.error(error)
    return res.sendStatus(500)
  }
})
