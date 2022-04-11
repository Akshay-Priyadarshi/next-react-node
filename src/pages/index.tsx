import { Head } from "next/document";
import FeatureCard, {
  FeatureCardProps,
} from "../components/feature-card/FeatureCard";
import styles from "../styles/home.module.css";

type FeatureCardPropsWithKey = FeatureCardProps & { key: number };

const features: FeatureCardPropsWithKey[] = [
  {
    key: 1,
    title: "Built-in Authentication",
    description: "Fast has Jwt authentication built in",
    link: "",
  },
  {
    key: 2,
    title: "Inbuilt Authentication",
    description: "Fast has Jwt authentication built in",
    link: "",
  },
  {
    key: 3,
    title: "Inbuilt Authentication",
    description: "Fast has Jwt authentication built in",
    link: "",
  },
];

const Index = () => {
  return (
    <>
      <div className={styles.homePage}>
        <section className={styles.heroSection}>
          <h2 className={styles.heroText}>
            NextJs - Backed by Express Server 🚀
          </h2>
          <p className={styles.heroSubText}>
            The server side NextJs template ready to be deployed <br />
            Opinionated by choice, loved by devs
          </p>
          <a href="">
            <button className={styles.heroButton}>View Repository</button>
          </a>
        </section>
        <section className={styles.featureSection}>
          <h3 className={styles.featureHeading}>Features & Advantages</h3>
          <div className={styles.featureContainer}>
            {features.map((feature) => {
              return (
                <FeatureCard
                  key={feature.key}
                  title={feature.title}
                  description={feature.description}
                  link={feature.link}
                />
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
