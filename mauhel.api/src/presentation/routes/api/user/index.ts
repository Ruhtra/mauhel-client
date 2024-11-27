import { Router } from 'express'
import { createUserRouter } from './create'
import { allUserRouter } from './all'
import { deleteUserRouter } from './delete'

export const userRouter = Router()

// Configura o "/api/user/create"
userRouter.use('/create', createUserRouter)
userRouter.use('/all', allUserRouter)
userRouter.use('/create', deleteUserRouter)
