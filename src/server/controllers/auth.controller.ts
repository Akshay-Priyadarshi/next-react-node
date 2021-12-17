import { NextFunction, Request, Response, Router } from 'express'
import { AuthService } from '../services/auth.service'
import { AppResponse } from '../types/responses/app.response'
import { AppSuccessResponse } from '../types/responses/success.response'

export const AuthController = Router()
const authService = new AuthService()

AuthController.get('/', (req, res) => {
	res.send('Authentication')
})

AuthController.post(
	'/login',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const loginResponse = await authService.login(req.body)
			const appResponse = new AppResponse({
				reqPath: req.originalUrl,
				success: new AppSuccessResponse({
					message: 'you have successfully logged in',
					data: loginResponse,
				}),
			})
			res.json(appResponse)
		} catch (err) {
			next(err)
		}
	}
)

AuthController.post(
	'/signup',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const signedupUser = await authService.signup(req.body)
			const appResponse = new AppResponse({
				reqPath: req.originalUrl,
				success: new AppSuccessResponse({
					message: 'you have successfully signed up',
					data: signedupUser,
				}),
			})
			res.json(appResponse)
		} catch (err) {
			next(err)
		}
	}
)
