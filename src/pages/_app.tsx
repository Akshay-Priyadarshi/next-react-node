import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Head from 'next/head'
import { store } from '../redux/store'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Provider store={store}>
				<Header />
				<Component {...pageProps} />
				<Footer />
			</Provider>
		</>
	)
}

export default MyApp
