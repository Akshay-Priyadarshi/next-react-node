import { UserDatabaseResponse } from '../../server/types/dtos/user.dto'

declare global {
	namespace Express {
		interface Request {
			user: UserDatabaseResponse | null | undefined
		}
	}
}
