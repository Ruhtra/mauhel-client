import { Router } from 'express'
import { allController } from '../../controllers/exam/allController'

const examRouter = Router()

examRouter.use('/all', allController)

export { examRouter }
