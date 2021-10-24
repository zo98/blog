import styles from "@/cStyles/content/contentRecommend.module.scss";
export default function contentRecommend(props) {
  return (
    <div className={styles.recommend}>
      <div className={styles.title}>
        <span>推荐板块</span>
      </div>
      <div className={`${styles.wrapper} clearFix`}>
        <div className={`${styles.item} lfloat`}>
          <a href="" style={{ backgroundImage: 'url("/imgs/1.jpg")' }}></a>
          <h4>
            <a href="">心情随笔</a>
          </h4>
        </div>
        <div className={`${styles.item} lfloat`}>
          <a href="" style={{ backgroundImage: 'url("/imgs/1.jpg")' }}></a>
          <h4>
            <a href="">心情随笔</a>
          </h4>
        </div>
      </div>
    </div>
  );
}
