import styles from "@/cStyles/content/contentLatestArticle.module.scss";

export default function contentLatestArticle(props) {
  return (
    <div className={styles.article}>
      <div className={styles.title}>
        <span>最新文章</span>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.item}>
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
        </div>

        <div className={styles.item}>
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
        </div>
      </div>
    </div>
  );
}
