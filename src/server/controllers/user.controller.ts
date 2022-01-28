import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/user.service'
import { AppResponse } from '../types/responses/app.response'
import { AppSuccessResponse } from '../types/responses/success.response'

export class UserController {
	constructor(private userService = new UserService()) {}

	getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const users = await this.userService.getAllUsers()
			const appResponse = new AppResponse({
				reqPath: req.originalUrl,
				success: new AppSuccessResponse({ data: users }),
			})
			res.json(appResponse)
		} catch (err) {
			next(err)
		}
	}

	getUserById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = await this.userService.getUserById(req.params.userId)
			const appResponse = new AppResponse({
				reqPath: req.originalUrl,
				success: new AppSuccessResponse({ data: user }),
			})
			res.json(appResponse)
		} catch (err) {
			next(err)
		}
	}

	updateUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updatedUser = await this.userService.updateUser(
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

	deleteUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const deletedUser = await this.userService.deleteUser(req.params.userId)
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

	resetUserPassword = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const resetResult = await this.userService.resetUserPassword(
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
}
