import {MailData} from '@sendgrid/helpers/classes/mail'
import { UserDatabaseResponse } from '../../server/types/dtos/user.dto'

declare global {
	namespace Express {
		export interface Request {
			user: UserDatabaseResponse | null | undefined
		}

		export interface Response {
			sendPdf: function(Buffer): void
			sendMail: function(MailDataRequired | MailDataRequired[]): void
		}
	}
}
