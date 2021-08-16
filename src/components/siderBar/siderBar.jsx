import styles from "@/cStyles/siderbar/siderBar.module.scss";
export default function Siderbar(props) {
  return (
    <div className={styles.wrapper} style={{ width: props.siderBarWidth }}>
      <div className={styles.header}>
        <h4 className={styles.title}>{props.title}</h4>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
