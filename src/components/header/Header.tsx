import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.css'

const Header = () => {
	const router = useRouter()

	return (
		<div className={styles.header}>
			<Link href="/">
				<a>
					<img className={styles.logo} src="/logo.svg" alt="RelierX-logo" />
				</a>
			</Link>
			<nav className={styles.navbar}>
				<Link href="/" passHref>
					<a>
						<button
							className={
								router.asPath === '/' ? styles.currentNavLink : styles.navLinks
							}
						>
							Home
						</button>
					</a>
				</Link>
				<Link href="/about" passHref>
					<a>
						<button
							className={
								router.asPath === '/about'
									? styles.currentNavLink
									: styles.navLinks
							}
						>
							About
						</button>
					</a>
				</Link>
				<Link href="/contact" passHref>
					<a>
						<button
							className={
								router.asPath === '/contact'
									? styles.currentNavLink
									: styles.navLinks
							}
						>
							Contact
						</button>
					</a>
				</Link>
				<Link href="/login" passHref>
					<a>
						<button
							className={
								router.asPath === '/login'
									? styles.currentNavLink
									: styles.navLinks
							}
						>
							Login
						</button>
					</a>
				</Link>
				<Link href="/signup" passHref>
					<a>
						<button
							className={
								router.asPath === '/signup'
									? styles.currentNavLink
									: styles.navLinks
							}
						>
							Sign Up
						</button>
					</a>
				</Link>
			</nav>
		</div>
	)
}

export default Header
