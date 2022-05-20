import styles from "./Button.module.scss";
import classNames from "classnames";

const Button = ({ children, variant, ...props }) => {
  const { disabled, onClick, type } = props;

  return (
    <button
      className={classNames(styles.button, {
        [styles.users]: variant === "users",
        [styles.signup]: variant === "signup",
        [styles.show]: variant === "show",
      })}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
