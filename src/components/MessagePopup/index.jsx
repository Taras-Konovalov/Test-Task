import styles from "./MessagePopup.module.scss";

export const MessagePopup = ({ message, onClick }) => {
  return (
    <div className={styles.messagePopup}>
      <div className={styles.container}>
        <button className={styles.button} onClick={() => onClick(false)}>
          <img src='/images/cross.svg' alt='cross' />
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};
