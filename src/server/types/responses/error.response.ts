import { StatusCodes } from 'http-status-codes'

export interface IAppErrorResponse {
	message: string
	statusCode?: number
}

export class AppErrorResponse extends Error {
	msg: string
	statusCode: number

	constructor(_: IAppErrorResponse) {
		super(_.message)
		this.name = 'AppError'
		this.msg = _.message
		this.statusCode = _.statusCode
			? _.statusCode
			: StatusCodes.INTERNAL_SERVER_ERROR
	}
}

export enum ClientErrorContext {
	BODY = 'body',
	PARAMS = 'params',
	QUERY = 'query',
}

export interface IClientError extends IAppErrorResponse {
	context: string
	path: string
}

export class ClientError extends AppErrorResponse {
	context: string
	path: string

	constructor(_: IClientError) {
		super({
			message: _.message,
			statusCode: _.statusCode ? _.statusCode : StatusCodes.BAD_REQUEST,
		})
		this.name = 'ClientError'
		this.context = _.context
		this.path = _.path
	}
}

export class AuthenticationError extends AppErrorResponse {
	constructor(_: IAppErrorResponse) {
		super({
			message: _.message,
			statusCode: _.statusCode ? _.statusCode : StatusCodes.UNAUTHORIZED,
		})
		this.name = 'AuthenticationError'
	}
}

export class AuthorizationError extends AppErrorResponse {
	constructor(_: IAppErrorResponse) {
		super({
			message: _.message,
			statusCode: _.statusCode ? _.statusCode : StatusCodes.FORBIDDEN,
		})
		this.name = 'AuthorizationError'
	}
}
