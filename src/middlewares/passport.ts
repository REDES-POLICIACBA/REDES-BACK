import passport from 'passport'
import passportJwt from 'passport-jwt'
import User from '../models/user'

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: <string>process.env.SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ _id: jwtPayload.id as string })
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    },
  ),
)

export default passport
