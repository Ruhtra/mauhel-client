import { Router } from 'express'
import { allController } from '../../controllers/user/allController'
import { createController } from '../../controllers/user/createController'
import { deleteController } from '../../controllers/user/DeleteController'
import { requireJwtAuthWithRole } from '../../auth/RequiredJwtAuth'
import { RoleType } from 'mauhel.api/src/domain/types/RoleType'

const userRouter = Router()

userRouter.use('/create', createController)
userRouter.use('/all', requireJwtAuthWithRole(RoleType.TEATCHER), allController)
userRouter.use('/delete/:idUser', deleteController)

export { userRouter }
