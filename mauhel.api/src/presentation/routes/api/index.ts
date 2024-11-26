import { router as userRouter } from './user'
import { Application } from 'express'

const Routes = (app: Application) => {
  app.use('/api/user', userRouter)
}

export const configApi = (app: Application) => {
  Routes(app)
}
