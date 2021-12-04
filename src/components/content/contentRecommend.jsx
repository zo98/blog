import styles from "@/cStyles/content/contentRecommend.module.scss";
export default function contentRecommend(props) {
  console.log(props);
  const renderItem = (data) => {
    return data.map((item) => {
      return (
        <div key={item.id} className={`${styles.item} lfloat`}>
          <a href="" style={{ backgroundImage: `url("${item.cover}")` }}></a>
          <h4>
            <a href="">{item.name}</a>
          </h4>
        </div>
      );
    });
  };
  return (
    <div className={styles.recommend}>
      <div className={styles.title}>
        <span>推荐板块</span>
      </div>
      <div className={`${styles.wrapper} clearFix`}>
        {renderItem(props.data)}
      </div>
    </div>
  );
}
