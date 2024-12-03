import { Router } from 'express'
import { userRouter } from './user'
import { examRouter } from './exam'

const apiRouter = Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/exam', examRouter)

export { apiRouter }
