import styles from "@/cStyles/header/index.module.scss";
import Img from "next/image";
export default function Index(props) {
  let { ipc, menu, blog, contact } = props.data;
  const preventDefault = (e) => {
    e.preventDefault();
  };
  return (
    <aside className={styles.container}>
      <div className={styles.shadow}>
        <div className={styles.header}>
          <div className={styles.profile}>
            <Img className={styles.img} width={100} height={100} src="/imgs/2.jpeg" alt="" />
          </div>
          <div className={styles.describe}>
            <p>{blog?.title ? blog.title : "Blog"}</p>
            <p>{blog?.description ? blog.description : "Blog描述"}</p>
          </div>
          <div className={styles.contact}>
            {contact
              ? contact.map((item) => {
                  return (
                    <a
                      key={item.name + item.url}
                      href={item.url}
                      onClick={item.url ? null : preventDefault}
                      title="微博"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    ></a>
                  );
                })
              : null}
          </div>
          <div className={styles.menuContainer}>
            <ul className={styles.menu}>
              {menu
                ? menu.map((item) => {
                    return (
                      <li key={item.url} className={styles.menuItem}>
                        <a href={item.url}>{item.name}</a>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.icp}>
        {ipc ? (
          <a
            href={ipc.url ? ipc.url : ""}
            onClick={ipc.url ? null : preventDefault}
          >
            {ipc.text}
          </a>
        ) : (
          ""
        )}
      </div>
    </aside>
  );
}
