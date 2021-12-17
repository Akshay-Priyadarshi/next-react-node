import { NextFunction, Request, Response } from 'express'
import { AppResponse } from '../types/responses/app.response'
import { AppErrorResponse } from '../types/responses/error.response'

export function ErrorMiddleware(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof AppErrorResponse) {
		res.status((err as AppErrorResponse).statusCode)
		const appResponse = new AppResponse({ reqPath: req.url, error: err })
		res.json(appResponse)
	} else {
		console.log(err)
		res.status(500).send('something wrong happened')
	}
}
