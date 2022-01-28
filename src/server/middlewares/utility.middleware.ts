import { NextFunction, Request, Response } from 'express'
import sgMail from '@sendgrid/mail'
import { getEnv } from '../utils/env.util'

export const UtilityMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.sendPdf = function (pdfBuffer: Buffer) {
		res.set({
			'Content-Type': 'application/pdf',
			'Content-Length': pdfBuffer.length,
		})
		res.send(pdfBuffer)
	}
	res.sendMail = function (
		mailContent: sgMail.MailDataRequired | sgMail.MailDataRequired[]
	) {
		const SGMAIL_KEY = getEnv('SGMAIL_KEY') as string
		sgMail.setApiKey(SGMAIL_KEY)
		sgMail
			.send(mailContent)
			.then(() => {
				res.send('mail sent')
			})
			.catch((err) => {
				console.log(JSON.stringify(err))
				res.send(`can't send mail`)
			})
	}
	next()
}
