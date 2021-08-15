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
                <SiderBarList type="classify" />
              </SiderBar>
            </li>
            <li style={{ marginTop: "15px" }}>
              <SiderBar title="近期文章">
                <SiderBarList type="article" />
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
  const { data } = await axios({
    url: "http://localhost:8000/api/article/getArticle",
    method: "GET",
    params: { id },
  });
  return { props: { data: data.data } };
}
