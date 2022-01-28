import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en-us">
				<Head>
					<title>Fast - NextJs with ExpressJS template</title>
					<meta
						name="description"
						content="NextJs template backed by express server."
					/>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
					<link
						rel="shortcut icon"
						href="/assets/favicon.ico"
						type="image/x-icon"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
