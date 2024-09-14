import passport from 'passport'
import passportJwt from 'passport-jwt'
import User from '../models/user'
import 'dotenv/config'

passport.use(
    new passportJwt.Strategy(
        {
            jwtFromRequest:
                passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: <string>process.env.SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.findOne({
                    _id: jwtPayload.id as string,
                })
                if (user) {
                    return done(null, user)
                }
                console.log('no encontre el usuario')
                return done(null, false)
            } catch (error) {
                console.log(error)
                return done(error, false)
            }
        },
    ),
)

export default passport
