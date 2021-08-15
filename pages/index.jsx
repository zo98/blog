import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
import Content from "@/components/content/content";
import ContentWaterfall from "@/components/content/contentWaterfall";
import LatestArticle from "@/components/content/contentLatestArticle";
import Recommend from "@/components/content/contentRecommend";
import Header from "@/components/header/index";
import autoRem from "@/common/autoRem";
import React from "react";
import Head from "next/head";
export const { Provider, Consumer } = React.createContext();
export default function Index(props) {
  autoRem();

  return (
    <>
      <main className="main">
        <div className="main-menu">
          <Header />
        </div>
        <div className="main-content">
          <Provider value={{ data: props.data }}>
            <Content>
              <ContentWaterfall />
              <LatestArticle />
              <Recommend />
            </Content>
          </Provider>
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
                <SiderBarList type="article" data={props.data} />
              </SiderBar>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const article = fetch("http://localhost:8000/api/article/getArticle").then(
    (res) => res.json()
  );
  const classify = fetch(
    "http://localhost:8000/api/classify/hotClassify?pageSize=5"
  ).then((res) => res.json());
  try {
    const [res1, res2] = await Promise.all([article, classify]);
    let data = [],
      classify_data = [];
    if (res1.code === 1) {
      data = res1.data.records;
    }
    if (res2.code === 1) {
      classify_data = res2.data.records;
    }
    return { props: { data, classify_data } };
  } catch (error) {
    return { props: { data: [], classify: [] } };
  }
}
