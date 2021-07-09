import styles from "@/cStyles/content/contentWaterfall.module.scss";
import { Consumer } from "@/pages/index.jsx";
export default function contentWaterfall(props) {
  return (
    <div className={styles.wrapper}>
      <Consumer>
        {(data) => {
          // console.log(data);
          return (
            <>
              <div className={styles.left}>
                <div className={styles.item}>
                  <a
                    href="/"
                    className={styles.cover}
                    style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                  >
                    <div>
                      <div className={styles.mask}></div>
                      <div className={styles.text}>
                        <h1>剪影流殇，光影华年</h1>
                        <p>
                          染指流沙，回绕不尽的世界繁华；
                          青灯孤伴，镌刻不完的午夜落花；
                          锦帛残卷，撰写不到的城南旧事； 蓦然...
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.item}>
                  <a
                    href="/"
                    className={styles.cover}
                    style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                  >
                    <div>
                      <div className={styles.mask}></div>
                      <div className={styles.text}>
                        <h1>剪影流殇，光影华年</h1>
                      </div>
                    </div>
                  </a>
                </div>

                <div className={styles.item}>
                  <a
                    href="/"
                    className={styles.cover}
                    style={{ backgroundImage: 'url("/imgs/1.jpg")' }}
                  >
                    <div>
                      <div className={styles.mask}></div>
                      <div className={styles.text}>
                        <h1>剪影流殇，光影华年</h1>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </>
          );
        }}
      </Consumer>
    </div>
  );
}
