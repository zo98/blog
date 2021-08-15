import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
import Content from "@/components/content/content";
import Header from "@/components/header/index";
import Article from "@/components/article/index";
import autoRem from "@/common/autoRem";
import axios from "axios";
import React from "react";
export const { Provider, Consumer } = React.createContext();
export default function Index(props) {
  autoRem();
  return (
    <Provider value={{ data: props.data }}>
      <main className="main">
        <div className="main-menu">
          <Header />
        </div>
        <div className="main-content">
          <Content>
            <Article />
          </Content>
        </div>
        <div className="main-siderbar">
          <ul style={{ position: "fixed" }}>
            <li>
              <SiderBar title="分类目录">
                <SiderBarList type="classify" data={props.classify_data} />
              </SiderBar>
            </li>
            <li style={{ marginTop: "15px" }}>
              <SiderBar title="近期文章">
                <SiderBarList type="article" data={props.articles_data} />
              </SiderBar>
            </li>
          </ul>
        </div>
      </main>
    </Provider>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const article = fetch(
    `http://localhost:8000/api/article/getArticle?id=${id}`
  ).then((res) => res.json());

  const articles = fetch("http://localhost:8000/api/article/getArticle").then(
    (res) => res.json()
  );
  const classify = fetch(
    "http://localhost:8000/api/classify/hotClassify?pageSize=5"
  ).then((res) => res.json());
  try {
    const [res1, res2, res3] = await Promise.all([article, classify, articles]);
    let data = [],
      classify_data = [],
      articles_data = [];
    if (res1.code === 1) {
      data = res1.data;
    }
    if (res2.code === 1) {
      classify_data = res2.data.records;
    }
    if (res3.code === 1) {
      articles_data = res3.data.records;
    }
    return { props: { data, classify_data, articles_data } };
  } catch (error) {
    console.log(error);
    return { props: { data: [], classify_data: [], articles_data: [] } };
  }
}
