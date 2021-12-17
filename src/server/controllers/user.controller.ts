import { Router, Request, Response, NextFunction } from 'express'
import {
	AuthenticationMiddleware,
	AuthorizationMiddleware,
	SelfAuthorizationMiddleware,
} from '../middlewares/auth.middleware'
import { UserAuthLevel } from '../database/user.model'
import { UserService } from '../services/user.service'
import { AppResponse } from '../types/responses/app.response'
import { AppSuccessResponse } from '../types/responses/success.response'
import { MailService } from '../services/mail.service'
import { getEnv } from '../utils/env.util'
import { AppErrorResponse } from '../types/responses/error.response'

export const UserController = Router()

const userService = new UserService()
const mailService = new MailService()

UserController.get(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await userService.getAllUsers()
			const appResponse = new AppResponse({
				reqPath: req.originalUrl,
				success: new AppSuccessResponse({ data: users }),
			})
			res.json(appResponse)
		} catch (err) {
			next(err)
		}
	}
)

UserController.get(
	'/:userId',
	AuthenticationMiddleware(),
	AuthorizationMiddleware(UserAuthLevel.USER),
	SelfAuthorizationMiddleware(),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await userService.getUserById(req.params.userId)
			const appResponse = new AppResponse({
				reqPath: req.originalUrl,
				success: new AppSuccessResponse({ data: user }),
			})
			res.json(appResponse)
		} catch (err) {
			next(err)
		}
	}
)

UserController.put(
	'/:userId',
	AuthenticationMiddleware(),
	AuthorizationMiddleware(UserAuthLevel.ADMIN),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updatedUser = await userService.updateUser(
				req.params.userId,
				req.body
			)
			const appResponse = new AppResponse({
				reqPath: req.originalUrl,
				success: new AppSuccessResponse({
					data: updatedUser,
					message: 'user account is modified successfully',
				}),
			})
			res.json(appResponse)
		} catch (err) {
			next(err)
		}
	}
)

UserController.delete(
	'/:userId',
	AuthenticationMiddleware(),
	AuthorizationMiddleware(UserAuthLevel.ADMIN),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const deletedUser = await userService.deleteUser(req.params.userId)
			const appResponse = new AppResponse({
				reqPath: req.originalUrl,
				success: new AppSuccessResponse({
					data: deletedUser,
					message: 'user account is deleted successfully',
				}),
			})
			res.json(appResponse)
		} catch (err) {
			next(err)
		}
	}
)

UserController.put(
	'/reset-password/:userId',
	AuthenticationMiddleware(),
	AuthorizationMiddleware(UserAuthLevel.USER),
	SelfAuthorizationMiddleware(),
	async (req, res, next) => {
		try {
			const resetResult = await userService.resetUserPassword(
				req.params.userId,
				req.body
			)
			if (resetResult) {
				res.json(
					new AppResponse({
						reqPath: req.originalUrl,
						success: new AppSuccessResponse({
							message: 'new password successfully saved',
						}),
					})
				)
			}
		} catch (err) {
			next(err)
		}
	}
)

UserController.get('/try-verify/:userId', async (req, res, next) => {
	try {
		const ifDev = getEnv('NODE_ENV') === 'development'
		const verifyBaseUrl = `${ifDev ? 'http' : 'https'}://${req.hostname}${
			ifDev ? `:${getEnv('PORT')}` : ''
		}${req.baseUrl}`
		const mailSent = await mailService.tryVerifyMail(
			req.hostname,
			req.params.userId,
			verifyBaseUrl
		)
		if (mailSent) {
			res.json(
				new AppResponse({
					reqPath: req.originalUrl,
					success: new AppSuccessResponse({
						message: 'verification email sent successfully',
					}),
				})
			)
		} else {
			next(
				new AppErrorResponse({ message: "couldn't send verification email" })
			)
		}
	} catch (err) {
		next(err)
	}
})

UserController.get(
	'/verify/:userId',
	async (req: Request<any, any, any, { token: string }>, res, next) => {
		try {
			const verifyResult = await userService.verifyUser(
				req.params.userId,
				req.query.token
			)
			if (verifyResult) {
				res.json(
					new AppResponse({
						reqPath: req.originalUrl,
						success: new AppSuccessResponse({
							message: 'user succcessfully verified',
						}),
					})
				)
			} else {
				next(new AppErrorResponse({ message: "can't verify user" }))
			}
		} catch (err) {
			next(err)
		}
	}
)
