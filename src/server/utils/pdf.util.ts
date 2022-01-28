import { AttachmentData } from '@sendgrid/helpers/classes/attachment'
import puppeteer from 'puppeteer'

export interface PdfData {
	buffer: Buffer
	fileName: string
}

export const generatePdf = async (html: string) => {
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()
	await page.setContent(html)
	const pdf = await page.pdf({ format: 'a4' })
	await browser.close()
	return pdf
}

export const pdfsToAttachments = (pdfDataArr: PdfData[]): AttachmentData[] => {
	const attachments: AttachmentData[] = pdfDataArr.map((pdfData, i) => {
		const attachment: AttachmentData = {
			content: pdfData.buffer.toString('base64'),
			filename: pdfData.fileName,
			contentId: i.toString(),
			disposition: 'attachment',
			type: 'application/pdf',
		}
		return attachment
	})
	return attachments
}
