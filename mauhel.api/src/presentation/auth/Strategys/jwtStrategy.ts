import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { env } from '../../env'
import { PrismaClient } from '@prisma/client'
import { Token } from 'backupmonitoring.shared/token'
import { PrismaUserRepository } from 'mauhel.api/src/infrastructure/repositories/PrismaUserRepository'

const prisma = new PrismaClient()
const userRepository = new PrismaUserRepository(prisma)

export const JWTStrategy = () => {
  const jwtLogin = new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET
    },
    async (payload: Token, done) => {
      try {
        const user = await userRepository.findById(payload.id)
        if (user) done(null, user)
        else done(null, false)
      } catch (err) {
        done(err, false)
      }
    }
  )

  passport.use(jwtLogin)
}
