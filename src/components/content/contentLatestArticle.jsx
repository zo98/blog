import styles from "@/cStyles/content/contentLatestArticle.module.scss";
import React from "react";
import { Consumer } from "@/pages/index.jsx";
import dayjs from "dayjs";
import clamp from "clamp-js";
export default function contentLatestArticle(props) {
  const renderImgs = (imgs) => {
    if (imgs.length > 3) {
      imgs.length = 3;
    }
    return imgs.map((img) => (
      <div
        key={img}
        className={styles.img}
        style={{
          backgroundImage: `url("http://localhost:8000/sources/images/${img}")`,
        }}
      ></div>
    ));
  };
  const renderViews = (data) => {
    return data.data.map((item) => {
      return (
        <div
          key={item.id}
          className={item.imgs.length === 1 ? styles.item_1 : styles.item}
        >
          {item.imgs.length !== 1 ? (
            <>
              <a href={`/article/${item.id}`}>
                <h1 className={styles.item_title}>{item.title}</h1>
                <main
                  className={styles.item_content}
                  dangerouslySetInnerHTML={{
                    __html: item.preview_content,
                  }}
                  ref={(node) => {
                    clamp(node, { clamp: 3 });
                  }}
                ></main>
              </a>
              <a href={`/article/${item.id}`}>
                <div className={styles.imgs}>{renderImgs(item.imgs)}</div>
              </a>
            </>
          ) : (
            <div className={styles.item_1_cont}>
              <a href={`/article/${item.id}`}>
                <h1 className={styles.item_title}>{item.title}</h1>
                <main
                  className={styles.item_content}
                  dangerouslySetInnerHTML={{
                    __html: item.preview_content,
                  }}
                  ref={(node) => {
                    clamp(node, { clamp: 3 });
                  }}
                ></main>
              </a>
              <a href={`/article/${item.id}`}>
                <div className={styles.imgs}>{renderImgs(item.imgs)}</div>
              </a>
            </div>
          )}

          <div className={styles.item_footer}>
            <label>{item.classify_name} </label>
            <time>{dayjs(item.create_time).format("YYYY-MM-DD")}</time>
          </div>
        </div>
      );
    });
  };
  return (
    <div className={styles.article}>
      <div className={styles.title}>
        <span>最新文章</span>
      </div>
      <div className={styles.wrapper}>
        <Consumer>{(data) => renderViews(data)}</Consumer>
      </div>
      <div className={styles.wrapper}>
        <button>加载更多</button>
      </div>
    </div>
  );
}
