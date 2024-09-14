import { Router } from 'express'
import { userController } from '../controllers/user'
import accountExist from '../middlewares/accountExist'
import passwordIsOk from '../middlewares/passIsOk'
import isVerified from '../middlewares/isVerified'
import passport from '../middlewares/passport'
import accountIsExist from '../middlewares/accountIsExist'
import { isAdmin } from '../middlewares/comision/isAdmin'
const router = Router()

router.post('/', accountIsExist, userController.createUser)

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    userController.updateUser,
)

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    userController.deleteUser,
)

router.post('/recoverypassword', userController.recoveryPassword)

router.post(
    '/signin',
    accountExist,
    passwordIsOk,
    isVerified,
    userController.signIn,
)

router.post(
    '/signout',
    passport.authenticate('jwt', { session: false }),
    userController.signOut,
)

router.post(
    '/signin/token',
    passport.authenticate('jwt', { session: false }),
    userController.signInToken,
)

router.post('/google', userController.authGoogle)
router.post('/verifycode', userController.verifyCode)
router.post('/changepassword', userController.changePassword)

router.get('/notifications/:id', userController.getNotifications)
router.get(
    '/instaladores',
    passport.authenticate('jwt', { session: false }),
    isAdmin,
    userController.getAllInstaladores,
)

export default router
