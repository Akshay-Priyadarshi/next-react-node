import { Router } from 'express'
import { generatePdf, pdfsToAttachments } from '../utils/pdf.util'
import { AuthRouter } from './auth.router'
import { UserRouter } from './user.router'
import { MailData } from '@sendgrid/helpers/classes/mail'
import { templateToHtml } from '../utils/pug.utils'

export const RootRouter = Router()

RootRouter.get('/', (req, res) => {
	res.status(200).send('✔️ Server is running fine')
})

RootRouter.get('/pdf-check', async (req, res) => {
	const filler = {
		title: '1',
		message: 'Akshay resume',
		pretty: true,
	}
	const html = templateToHtml('1', filler)
	const pdf = await generatePdf(html)
	res.sendPdf(pdf)
})

RootRouter.get('/mail-pdf-check', async (req, res) => {
	const html = templateToHtml('love', {
		name: 'Ananya Rout',
		pretty: true,
	})
	const pdf = await generatePdf(html)
	const mailContent: MailData = {
		from: 'akshayp1904@outlook.com',
		to: 'coolap99@gmail.com',
		html: html,
		subject: 'Electronic Love Letter',
		attachments: pdfsToAttachments([
			{ buffer: pdf, fileName: 'love-letter.pdf' },
		]),
	}
	res.sendMail(mailContent)
})

RootRouter.use('/users', UserRouter)

RootRouter.use('/auth', AuthRouter)

RootRouter.get('/*', (req, res) => {
	res.send('Undefined API')
})
