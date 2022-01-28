import pug from 'pug'
import { TEMPLATES_PATH } from '../constants/app.constants'

export const templateToHtml = (
	templateName: string,
	filler: pug.Options & pug.LocalsObject
) => {
	const html = pug.renderFile(TEMPLATES_PATH + templateName + '.pug', filler)
	return html
}
