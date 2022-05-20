import styles from "./Main.module.scss";
import Button from "../Button";

export const Main = () => {
  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            Test assignment for front-end developer
          </h1>
          <p className={styles.text}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <a href='#signup'>
            <Button variant='signup' disabled={false}>
              Sign up
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
