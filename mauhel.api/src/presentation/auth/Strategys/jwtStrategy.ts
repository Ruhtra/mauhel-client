import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { env } from '../../env'
import { PrismaClient } from '@prisma/client'
import { Token } from 'backupmonitoring.shared/token'

const prisma = new PrismaClient()

export const JWTStrategy = () => {
  const jwtLogin = new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Altere para este
      secretOrKey: env.JWT_SECRET
    },
    async (payload: Token, done) => {
      try {
        console.log(payload)
        const user = await prisma.user.findUnique({
          where: {
            id: payload.id
          }
        })
        if (user) done(null, user)
        else done(null, false)
      } catch (err) {
        done(err, false)
      }
    }
  )

  passport.use(jwtLogin)
}
