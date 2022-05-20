import styles from "./Header.module.scss";
import Button from "../Button";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src='/images/logo.svg' width='104' height='26' alt='logo' />
        <div className={styles.buttons}>
          <a href='#users'>
            <Button variant='users' disabled={false}>
              Users
            </Button>
          </a>
          <a href='#signup'>
            <Button variant='signup' disabled={false}>
              Sign up
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
