import { Router } from 'express'
import { allController } from '../../controllers/user/allController'
import { createController } from '../../controllers/user/createController'
import { deleteController } from '../../controllers/user/DeleteController'

const userRouter = Router()

userRouter.use('/create', createController)
userRouter.use('/all', allController)
userRouter.use('/delete/:idUser', deleteController)

export { userRouter }
