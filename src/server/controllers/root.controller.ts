import { Router } from 'express'
import { AuthController } from './auth.controller'
import { UserController } from './user.controller'

export const RootController = Router()

RootController.get('/', (req, res) => {
	res.status(200).send('✔️ Server is running fine')
})

RootController.use('/users', UserController)
RootController.use('/auth', AuthController)
