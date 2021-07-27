import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
import Content from "@/components/content/content";
import ContentWaterfall from "@/components/content/contentWaterfall";
import LatestArticle from "@/components/content/contentLatestArticle";
import Recommend from "@/components/content/contentRecommend";
import Header from "@/components/header/index";
import autoRem from "@/common/autoRem";
import React from "react";

export const { Provider, Consumer } = React.createContext();
export default function Index(props) {
  autoRem();

  return (
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
              <SiderBarList />
            </SiderBar>
          </li>
          <li style={{ marginTop: "15px" }}>
            <SiderBar title="近期文章">
              <SiderBarList />
            </SiderBar>
          </li>
        </ul>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  let res = await fetch("http://localhost:8000/api/article/getArticle");
  res = await res.json();
  return { props: { data: res.data } };
}
