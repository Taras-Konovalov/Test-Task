import styles from "./Tooltip.module.scss";

const ToolTip = ({ text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tooltip}>
        <div>{text}</div>
      </div>
    </div>
  );
};

export default ToolTip;
