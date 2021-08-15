import styles from "@/cStyles/siderbar/siderBarList.module.scss";

export default function SiderbarList(props) {
  const { type, data } = props;
  const renderlist = (type, data) => {
    if (data && data.length > 5) {
      data.length = 5;
    }
    switch (type) {
      case "classify":
        return data.map((item) => (
          <li key={item.id} className={styles.item}>
            <a href="/">{item.name}</a>
          </li>
        ));
      case "article":
        return data.map((item) => (
          <li key={item.id} className={styles.item}>
            <a href={`/article/${item.id}`}>
              {item.title}
            </a>
          </li>
        ));
      default:
        return;
    }
  };

  return <ul className={styles.list}>{renderlist(type, data)}</ul>;
}
