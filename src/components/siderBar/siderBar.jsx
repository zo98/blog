import styles from "@/cStyles/siderbar/siderBar.module.scss";
export default function Siderbar(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4 className={styles.title}>近期文章</h4>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
