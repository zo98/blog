import styles from "@/cStyles/siderbar/siderBarList.module.scss";
import Link from "next/link";
export default function SiderbarList(props) {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link href="/">剪影流殇，光影华年</Link>
      </li>
      <li className={styles.item}>
        <Link href="/">我想走遍世界每一个角落</Link>
      </li>
      <li className={styles.item}>
        <Link href="/">我想走遍世界每一个角落</Link>
      </li>
    </ul>
  );
}
