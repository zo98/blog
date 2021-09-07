import styles from "@/cStyles/content/contentLatestArticle.module.scss";
import { useRouter } from "next/router";
import Item from "@/components/articleItem.jsx";

export default function articleClassify(props) {
  const router = useRouter();

  const loadMoreData = () => {
    router.push(
      {
        pathname: window.location.pathname,
        query: { limit: props.pages.pageSize + 10 },
      },
      "",
      { scroll: false }
    );
  };

  return (
    <div className={styles.article}>
      <div className={styles.classify}>
        {props.data[0] ? props.data[0].classify_name : ""}
      </div>
      <Item data={props.data} />
      <div className={styles.more}>
        {props.pages.total > props.pages.currentPage * props.pages.pageSize ? (
          <button onClick={loadMoreData}>加载更多</button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
