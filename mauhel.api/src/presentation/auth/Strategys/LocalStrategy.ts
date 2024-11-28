import { PrismaClient } from '@prisma/client'
import { Token } from 'backupmonitoring.shared/token'
import { loginUseCase } from 'mauhel.api/src/application/useCases/Login'
import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'
import { RoleType } from 'mauhel.api/src/domain/types/RoleType'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const prisma = new PrismaClient()

export const LocalStrategies = () => {
  const LocalLogin = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      const user = await loginUseCase.execute({ email, password })

      if (!user)
        return done(undefined, false, {
          message: `Email ${email} not found or password incorrect`
        })
      return done(null, user.user)
    }
  )
  passport.use(LocalLogin)
}
