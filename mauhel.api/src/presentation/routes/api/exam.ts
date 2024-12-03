import { Router } from 'express'
import { allController } from '../../controllers/exam/allController'
import { createController } from '../../controllers/exam/createController'

const examRouter = Router()

examRouter.get('/all', allController)
examRouter.post('/create', createController)

export { examRouter }
