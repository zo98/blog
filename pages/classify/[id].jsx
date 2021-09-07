import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
import Content from "@/components/content/content";
import Header from "@/components/header/index";
import LatestArticle from "@/components/classify/articleClassify";
import Recommend from "@/components/content/contentRecommend";
import autoRem from "@/common/autoRem";
import React from "react";
export const { Provider, Consumer } = React.createContext();
export default function Index(props) {
  autoRem();
  return (
    <Provider value={{ data: props.data }}>
      <main className="main">
        <div className="main-menu">
          <Header data={props.homeData.config} />
        </div>
        <div className="main-content">
          <Content>
            <LatestArticle data={props.data} pages={props.pages} />
            <Recommend />
          </Content>
        </div>
        <div className="main-siderbar">
          <ul style={{ position: "fixed" }}>
            <li>
              <SiderBar title="分类目录">
                <SiderBarList type="classify" data={props.homeData.classify} />
              </SiderBar>
            </li>
            <li style={{ marginTop: "15px" }}>
              <SiderBar title="近期文章">
                <SiderBarList type="article" data={props.homeData.article} />
              </SiderBar>
            </li>
          </ul>
        </div>
      </main>
    </Provider>
  );
}

export async function getServerSideProps(context) {
  let { id, limit: pageSize } = context.query;
  if (!pageSize) {
    pageSize = 10;
  }
  const article = fetch(
    `http://localhost:8000/api/article/getArticleByClassify?id=${id}?pageSize=${pageSize}`
  ).then((res) => res.json());

  const home = fetch("http://localhost:8000/api/blogdata").then((res) =>
    res.json()
  );
  let data = [],
    homeData = {},
    pages = {};
  try {
    const [res1, res2] = await Promise.all([article, home]);

    if (res1.code) {
      data = res1.data.records;
    }
    if (res2.code) {
      homeData = res2.data;
    }
    const { total, pageSize, currentPage } = res1.data;
    pages = {
      total,
      pageSize,
      currentPage,
    };

    return { props: { data, homeData, pages } };
  } catch (error) {
    return { props: { data, homeData, pages } };
  }
}
