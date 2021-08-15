import styles from "@/cStyles/siderbar/siderBarList.module.scss";
import axios from "@/http/service";
import { set } from "lodash";
import { useEffect, useState } from "react";
export default function SiderbarList(props) {
  const { type } = props;
  const [data, setData] = useState([]);
  const renderList = (type, data) => {
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
            <a href={`/article/${item.id}`}>{item.title}</a>
          </li>
        ));
      default:
        break;
    }
  };
  useEffect(() => {
    switch (type) {
      case "classify":
        axios({
          url: "/api/classify/hotClassify",
          params: {
            pageSize: 5,
          },
        }).then(({ data }) => {
          // console.log(data);
          if (data.code) {
            setData(data.data.records);
          }
        });
        break;
      case "article":
        axios({
          url: "/api/article/getArticle",
          params: {
            pageSize: 5,
          },
        }).then(({ data }) => {
          if (data.code) {
            setData(data.data.records);
          }
        });
        break;
      default:
        break;
    }
  }, []);

  return <ul className={styles.list}>{renderList(type, data)}</ul>;
}
