import { Transporter, createTransport, SendMailOptions } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { getEnv } from './env.util'

export const getEmailTransporter = (
	host: string
): Transporter<SMTPTransport.SentMessageInfo> => {
	const emailTransporter: Transporter<SMTPTransport.SentMessageInfo> =
		createTransport({
			host: host,
			service: 'gmail',
			auth: {
				user: getEnv('EMAIL_USERNAME'),
				pass: getEnv('EMAIL_PASSWORD'),
			},
		})
	return emailTransporter
}

export const getMailOptions = (
	mailTo: string,
	mailSubject: string,
	mailContent: string
): SendMailOptions => {
	const mailOptions: SendMailOptions = {
		from: getEnv('EMAIL_USERNAME'),
		to: mailTo,
		subject: mailSubject,
		html: mailContent,
	}
	return mailOptions
}
