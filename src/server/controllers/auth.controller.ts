import { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { AppResponse } from '../types/responses/app.response'
import { AppSuccessResponse } from '../types/responses/success.response'

export class AuthController {
	constructor(private authService = new AuthService()) {}

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const loginResponse = await this.authService.login(req.body)
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

	signup = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const signedupUser = await this.authService.signup(req.body)
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
}
