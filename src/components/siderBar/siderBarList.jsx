import styles from "@/cStyles/siderbar/siderBarList.module.scss";

export default function SiderbarList(props) {
  const { type, data } = props;
  const renderlist = (type, data) => {
    switch (type) {
      case "classify":
        return data.map((item) => (
          <li key={item.id} className={styles.item}>
            <a href={`/${item.id}`}>{item.name}</a>
          </li>
        ));
      case "article":
        return data.map((item) => (
          <li key={item.id} className={styles.item}>
            <a href={`/article/${item.id}`}>{item.title}</a>
          </li>
        ));
      default:
        break;
    }
  };

  return <ul className={styles.list}>{renderlist(type, data)}</ul>;
}
