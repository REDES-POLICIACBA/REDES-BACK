import { Router } from 'express'
import { userController } from '../controllers/user'
import accountExist from '../middlewares/accountExist'
import passwordIsOk from '../middlewares/passIsOk'
import isVerified from '../middlewares/isVerified'
import passport from '../middlewares/passport'
import accountIsExist from '../middlewares/accountIsExist'
const router = Router()

router.post('/', accountIsExist, userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.post('/recoverypassword', userController.recoveryPassword)
router.post(
    '/signin',
    accountExist,
    passwordIsOk,
    isVerified,
    userController.signIn,
)

router.post(
    '/signin/token',
    passport.authenticate('jwt', { session: false }),
    userController.signInToken,
)
export default router
