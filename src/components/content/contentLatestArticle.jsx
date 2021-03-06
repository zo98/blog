import styles from "@/cStyles/content/contentLatestArticle.module.scss";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import clamp from "clamp-js";
import { useRouter } from "next/router";
import Item from "@/components/articleItem.jsx";

export default function contentLatestArticle(props) {
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
      <div className={styles.title}>
        <span>最新文章</span>
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
