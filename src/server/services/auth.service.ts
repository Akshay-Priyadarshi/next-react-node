import { sign } from 'jsonwebtoken'
import { ILoginCredentialsDto, ILoginResponseDto } from '../types/dtos/auth.dto'
import { CreateUserDto, UserDatabaseResponse } from '../types/dtos/user.dto'
import { AuthenticationError } from '../types/responses/error.response'
import { getEnv } from '../utils/env.util'
import { verifyPassword } from '../utils/password.util'
import { UserService } from './user.service'

export class AuthService {
	// Internal user service
	constructor(private userService = new UserService()) {}

	/**
	 * Login
	 * @param {ILoginCredentialsDto} loginCredentials Object with email and password
	 * @returns {Promise<ILoginResponseDto | undefined>} Signed bearer token
	 * @description Login using email and password
	 * @author Akshay Priyadarshi <akshayp1904@outlook.com>
	 */
	async login(
		loginCredentials: ILoginCredentialsDto
	): Promise<ILoginResponseDto | undefined> {
		const user = await this.userService.getUserLoginCredentials(
			loginCredentials.email
		)
		if (user) {
			if (verifyPassword(loginCredentials.password, user.password)) {
				const signedAuthToken = sign(
					{ sub: user.id },
					getEnv('JWT_SECRET') as string
				)
				const signedBearerAuthToken = `Bearer ${signedAuthToken}`
				const loginResponse: ILoginResponseDto = {
					token: signedBearerAuthToken,
					loggedInUserId: user.id,
				}
				return loginResponse
			} else {
				throw new AuthenticationError({
					message: 'incorrect email & password combination',
				})
			}
		} else {
			throw new AuthenticationError({
				message: 'email not registered, try signing up first!',
			})
		}
	}

	/**
	 * Signup
	 * @param {CreateUserDto} createUserDto Object for creating user
	 * @returns {Promise<UserDatabaseResponse | null | undefined>} Created user
	 * @description Creates and return user
	 * @author Akshay Priyadarshi <akshayp1904@outlook.com>
	 */
	async signup(
		createUserDto: CreateUserDto
	): Promise<UserDatabaseResponse | null | undefined> {
		const signedupUser = await this.userService.createUser(createUserDto)
		return signedupUser
	}
}
