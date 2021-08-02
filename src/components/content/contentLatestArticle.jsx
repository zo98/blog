import styles from "@/cStyles/content/contentLatestArticle.module.scss";
import { Consumer } from "@/pages/index.jsx";
import dayjs from "dayjs";
import clamp from "clamp-js";
export default function contentLatestArticle(props) {
  return (
    <div className={styles.article}>
      <div className={styles.title}>
        <span>最新文章</span>
      </div>
      <div className={styles.wrapper}>
        <Consumer>
          {(data) =>
            data.data.map((item) => (
              <div key={item.id} className={styles.item}>
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
                  <div className={styles.imgs}>
                    <div
                      className={styles.img}
                      style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                    />
                    <div
                      className={styles.img}
                      style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                    />
                    <div
                      className={styles.img}
                      style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                    />
                  </div>
                </a>

                <div className={styles.item_footer}>
                  <label>{item.classify_name} </label>
                  <time>{dayjs(item.create_time).format("YYYY-MM-DD")}</time>
                </div>
              </div>
            ))
          }
        </Consumer>

        {/* {props.data.forEach((item) => (
          <div className={styles.item}>
            <a href={`/article/${item.id}`}>
              <h1 className={styles.item_title}>剪影流殇，光影华年</h1>
              <div className={styles.item_content}>{item.preview_content}</div>
            </a>

            <a href="/article/121113">
              <div className={styles.imgs}>
                <div
                  className={styles.img}
                  style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                />
                <div
                  className={styles.img}
                  style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                />
                <div
                  className={styles.img}
                  style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                />
              </div>
            </a>

            <div className={styles.item_footer}>
              <label>心情随笔 </label>
              <time> 2020-01-20</time>
            </div>
          </div>
        ))} */}

        {/* <div className={styles.item}>
          <a href="/article/121113">
            <h1 className={styles.item_title}>剪影流殇，光影华年</h1>
            <div className={styles.item_content}>
              <p>
                染指流沙，回绕不尽的世界繁华；
                青灯孤伴，镌刻不完的午夜落花；锦帛残卷，撰写不到的城南旧事；
                蓦然回首，消逝不见的绝美年华。[...]
              </p>
            </div>
          </a>

          <a href="/article/121113">
            <div className={styles.imgs}>
              <div
                className={styles.img}
                style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
              />
              <div
                className={styles.img}
                style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
              />
              <div
                className={styles.img}
                style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
              />
            </div>
          </a>

          <div className={styles.item_footer}>
            <label>心情随笔 </label>
            <time> 2020-01-20</time>
          </div>
        </div> */}
      </div>
    </div>
  );
}
