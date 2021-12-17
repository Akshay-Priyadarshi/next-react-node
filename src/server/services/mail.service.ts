import { readFileSync } from 'fs'
import { JwtPayload, sign } from 'jsonwebtoken'
import { getEmailTransporter, getMailOptions } from '../utils/email-sender.util'
import { getEnv } from '../utils/env.util'
import { UserService } from './user.service'

export class MailService {
	constructor(private userService = new UserService()) {}

	forgotUserPasswordOtpMail = async (userId: string) => {}

	tryVerifyMail = async (
		host: string,
		userId: string,
		verifyBaseUrl: string
	): Promise<boolean | undefined> => {
		const user = await this.userService.getUserById(userId)
		if (user) {
			if (!user.verified) {
				const jwtVerifyUserSecret = getEnv('JWT_VERIFY_USER_SECRET') as string
				const payload: JwtPayload = { sub: user.id }
				const signedToken = sign(payload, jwtVerifyUserSecret)
				const verifyTemplate = readFileSync(
					'src/server/statics/verify-user-otp.html',
					{
						encoding: 'utf-8',
					}
				)
				const verifyUrl = `${verifyBaseUrl}/verify/${userId}?token=${signedToken}`
				const verifyTemplateWithVerifyUrl = verifyTemplate.replace(
					'[VERIFY-USER-ROUTE]',
					verifyUrl
				)
				const mailSubject = `Verify your email with us`
				getEmailTransporter(host).sendMail(
					getMailOptions(user.email, mailSubject, verifyTemplateWithVerifyUrl)
				)
				return true
			}
		}
		return false
	}
}
