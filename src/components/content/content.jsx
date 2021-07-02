import styles from "@/cStyles/content/content.module.scss";
export default function Content(props) {
  return <div className={styles.content}>{props.children}</div>;
}
