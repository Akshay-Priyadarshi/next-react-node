import {MailData} from '@sendgrid/helpers/classes/mail'
import { UserDatabaseResponse } from '../../server/types/dtos/user.dto'

declare global {
	namespace Express {
		export interface Request {
			user: UserDatabaseResponse | null | undefined
		}
	}
}
