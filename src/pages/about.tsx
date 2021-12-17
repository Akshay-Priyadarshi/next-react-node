import axios from 'axios'
import useSWR from 'swr'
import styles from '../styles/about.module.css'

const About = () => {
	const fetchUsers = async () => {
		const res = await axios.get('/api/users')
		return res.data
	}

	const { error, data } = useSWR('/api/users', fetchUsers)

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	return (
		<div className={styles.aboutPage}>
			<h1>About</h1>
			{console.log(data.success.data)}
			{data.success.data.map((user) => {
				return (
					<div key={user._id}>
						<h5>{user.email}</h5>
						{user.profile ? <p>{user.profile.name.last}</p> : <p>No name</p>}
					</div>
				)
			})}
		</div>
	)
}

export default About
