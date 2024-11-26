import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

import { env } from '../../env'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const googleStrategy = () => {
  const googleLogin = new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_REDIRECT_URL,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await prisma.user.upsert({
          create: {
            id: '123123123',
            password: '123123213',
            role: 'admin',
            provider: 'google',
            googleId: profile.id,
            username: `user${profile.id}`,
            email: profile.email,
            name: profile.displayName,
            isSubscribed: false,
            birthDate: new Date(),
            createdAt: new Date(),
            updatetAt: null,
            idClientStripe: null,
            profilePicture: profile.picture
          },
          update: {
            provider: 'google',
            googleId: profile.id,
            username: `user${profile.id}`,
            name: profile.displayName,
            updatetAt: new Date(),
            profilePicture: profile.picture
          },
          where: {
            email: profile.email
          }
        })

        done(null, user)
      } catch (err) {
        console.log(err)
      }
    }
  )

  passport.use(googleLogin)
}
