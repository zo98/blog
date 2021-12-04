import styles from "@/cStyles/content/contentWaterfall.module.scss";
import { useEffect } from "react";
import clamp from "clamp-js";

export default function contentWaterfall(props) {
  console.log(props);
  useEffect(() => {
    [...document.getElementsByClassName("preview_content")].forEach((node) => {
      clamp(node, { clamp: 3 });
    });
  }, [props.data]);

  const onClick = (e, id) => {
    e.preventDefault();
  };

  const getImg = (arr = []) => {
    if (arr.length) {
      return `url("/sources/images/${arr[0]}")`;
    }
    return 'url("/imgs/1.jpg")';
  };

  const renderViews = (data) => {
    if (data.length <= 2) {
      return data.map((item) => {
        return (
          <div key={item.id} className={styles.left}>
            <div className={styles.item}>
              <a
                href={`/article/${item.id}`}
                onClick={(e) => {
                  onClick(e, item.id);
                }}
                className={styles.cover}
                style={{ backgroundImage: getImg(item.imgs) }}
              >
                <div>
                  <div className={styles.mask}></div>
                  <div className={styles.text}>
                    <h1>{item.title}</h1>
                    <p className="preview_content">{item.preview_content}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        );
      });
    }
    if (data.length === 3) {
      const item = data[0];
      return (
        <>
          <div className={styles.left}>
            <div className={styles.item}>
              <a
                href={`/article/${item.id}`}
                onClick={(e) => {
                  onClick(e, item.id);
                }}
                className={styles.cover}
                style={{ backgroundImage: getImg(item.img) }}
              >
                <div>
                  <div className={styles.mask}></div>
                  <div className={styles.text}>
                    <h1>{item.title}</h1>
                    <p className="preview_content">{item.preview_content}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className={styles.right}>
            {data.map((item, index) => {
              if (index) {
                return (
                  <div key={item.id} className={styles.item}>
                    <a
                      href={`/article/${item.id}`}
                      onClick={(e) => {
                        onClick(e, item.id);
                      }}
                      className={styles.cover}
                      style={{ backgroundImage: getImg(item.img) }}
                    >
                      <div>
                        <div className={styles.mask}></div>
                        <div className={styles.text}>
                          <h1>{item.title}</h1>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              }
            })}
          </div>
        </>
      );
    }
  };

  return <div className={styles.wrapper}>{renderViews(props.data)}</div>;
}
