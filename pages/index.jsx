import Link from "next/link";
import styles from "../styles/index.module.scss";
import { useState, useEffect } from "react";
export default function Index() {
  const [isSticky, setSticky] = useState(false);
  let sidebarNode = null;
  useEffect(() => {
    window.addEventListener(
      "scroll",
      (() => {
        let timer = null;
        return () => {
          if (!timer) {
            timer = setTimeout(() => {
              let top =
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                window.pageYOffset;
              console.log(top > sidebarNode.offsetTop);
              console.log(window.getComputedStyle(sidebarNode).width);
              timer = null;
            }, 180);
          }
        };
      })()
    );
  }, []);
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <aside className={styles.wrapper_left}></aside>
        <div className={styles.wrapper_right}>
          <div className={styles.wrapper_right_main}>
            <div className={styles.wrapper_right_main_content}></div>
          </div>
          <aside className={styles.wrapper_right_sidebar}>
            <div
              ref={(node) => {
                sidebarNode = node;
              }}
              className={styles.wrapper_right_sidebar_main}
            >
              <div className={styles.wrapper_right_sidebar_main_content}>
                1234
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
