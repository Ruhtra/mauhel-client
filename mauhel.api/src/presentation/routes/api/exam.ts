import { Router } from 'express'
import { allController } from '../../controllers/exam/allController'
import { createController } from '../../controllers/exam/createController'
import { addQuestionController } from '../../controllers/exam/addQuestionController'

const examRouter = Router()

examRouter.get('/all', allController)
examRouter.post('/create', createController)
examRouter.post('/addQuestion', addQuestionController)

export { examRouter }
