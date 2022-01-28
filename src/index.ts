import express from 'express'
import dotenv from 'dotenv'
import next from 'next'
import { JwtMiddleware } from './server/middlewares/jwt.middleware'
import { ErrorMiddleware } from './server/middlewares/error.middleware'
import { ensureDatabaseConnection } from './server/utils/db.util'
import { getEnv } from './server/utils/env.util'
import { RootRouter } from './server/routers/root.router'
import { UtilityMiddleware } from './server/middlewares/utility.middleware'

// Configuring environment variables
if (process.env.NODE_ENV === 'development') {
	dotenv.config()
}

// Setting PORT constant
const PORT = parseInt(getEnv('PORT') as string) || 8080
const isDev = process.env.NODE_ENV === 'development'
const nextApp = next({ dev: isDev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
	const expressApp = express()

	// Applying all middlewares
	expressApp.use(express.json())
	expressApp.use(express.urlencoded({ extended: true }))
	expressApp.use(UtilityMiddleware)
	// Authentication & Authorization middleware
	expressApp.use(JwtMiddleware)

	// Connecting to root router
	expressApp.use('/api', RootRouter)
	expressApp.all('*', (req, res) => handle(req, res))

	// Error handler middleware
	expressApp.use(ErrorMiddleware)

	// Ensure database connection and start server
	ensureDatabaseConnection().then(() => {
		expressApp.listen(PORT, () => {
			console.log(`🚀 Server listening at http://localhost:${PORT}/`)
		})
	})
})
