import styles from './FeatureCard.module.css'

export interface FeatureCardProps {
	title: string
	description: string
	link: string
}

const FeatureCard = (props: FeatureCardProps) => {
	return (
		<div className={styles.featureCard}>
			<h4>{props.title}</h4>
			<p>{props.description}</p>
			<a href={props.link}>
				<button>View More</button>
			</a>
		</div>
	)
}

export default FeatureCard
