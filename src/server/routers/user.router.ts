import { Router } from 'express'
import { UserController } from '../controllers/user.controller'
import { UserAuthLevel } from '../database/user.model'
import {
	AuthenticationMiddleware,
	AuthorizationMiddleware,
	SelfAuthorizationMiddleware,
} from '../middlewares/auth.middleware'

export const UserRouter = Router()

const userController = new UserController()

UserRouter.get('/', userController.getAllUsers)

UserRouter.get(
	'/:userId',
	AuthenticationMiddleware(),
	AuthorizationMiddleware(UserAuthLevel.USER),
	SelfAuthorizationMiddleware(),
	userController.getAllUsers
)

UserRouter.put(
	'/:userId',
	AuthenticationMiddleware(),
	AuthorizationMiddleware(UserAuthLevel.ADMIN),
	userController.getUserById
)

UserRouter.delete(
	'/:userId',
	AuthenticationMiddleware(),
	AuthorizationMiddleware(UserAuthLevel.ADMIN),
	userController.deleteUser
)

UserRouter.put(
	'/reset-password/:userId',
	AuthenticationMiddleware(),
	AuthorizationMiddleware(UserAuthLevel.USER),
	SelfAuthorizationMiddleware(),
	userController.resetUserPassword
)
