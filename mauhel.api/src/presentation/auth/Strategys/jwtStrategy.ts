import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { env } from '../../env'

export const JWTStrategy = () => {
  const jwtLogin = new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Altere para este
      secretOrKey: env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        console.log(payload)

        // const user = await prismaClient.googleUser.findUnique({
        //   where: {
        //     email: payload.email
        //   }
        // })
        // if (user) done(null, user)
        // else done(null, false)
      } catch (err) {
        done(err, false)
      }
    }
  )

  passport.use(jwtLogin)
}
