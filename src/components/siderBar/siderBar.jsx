// 分类目录 || 近期文章
import styles from "@/cStyles/siderbar/siderBar.module.scss";
import { useMemo } from "react";
import { useRouter } from "next/router";
export default function Siderbar(props) {
  const router = useRouter();
  const url = useMemo(() => {
    const { title } = props;
    switch (title) {
      case "分类目录":
        return "/classify/";
      case "近期文章":
        return "/article/";
      default:
        break;
    }
  }, [props.title]);

  const goTo = () => {
    router.push(url);
  };
  return (
    <aside className={styles.wrapper} style={{ width: props.siderBarWidth }}>
      <div className={styles.header}>
        <h4 className={styles.title} onClick={goTo}>
          {props.title}
        </h4>
      </div>
      <div className={styles.content}>{props.children}</div>
    </aside>
  );
}
