import styles from "@/cStyles/content/content.module.scss";
export default function Content(props) {
  return <div className={styles.container}>{props.children}</div>;
}
