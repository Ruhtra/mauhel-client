import { PrismaClient } from '@prisma/client'
import { UserEntity } from 'mauhel.api/src/domain/entities/UserEntity'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const prisma = new PrismaClient()

export const LocalStrategies = () => {
  const LocalLogin = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email.toLocaleLowerCase(),
          password: password
        }
      })

      if (!user) {
        return done(undefined, false, {
          message: `Email ${email} not found. or password incorrect`
        })
      }

      return done(
        undefined,
        UserEntity.with({
          id: user.id,
          email: user.email,
          name: user.name,
          birthDate: user.birthDate,
          profilePicture: user.profilePicture,
          createdAt: user.createdAt,
          isSubscribed: user.isSubscribed,
          idClientStripe: user.idClientStripe,
          googleId: user.googleId,
          provider: user.provider,
          username: user.username,
          role: user.role
        })
      )
    }
  )
  passport.use(LocalLogin)
}
