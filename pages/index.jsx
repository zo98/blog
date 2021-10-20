import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
// import Content from "@/components/content/content";
import ContentWaterfall from "@/components/content/contentWaterfall";
import LatestArticle from "@/components/content/contentLatestArticle";
import Recommend from "@/components/content/contentRecommend";
import Header from "@/components/header/index";
import autoRem from "@/common/autoRem";
// import React from "react";
// import Head from "next/head";
export default function Index(props) {
  autoRem();

  return (
    <>
      <main className="main">
        <div className="main-menu">
          <Header data={props.homeData.config} />
        </div>
        <div className="main-content">
          <div className="container">
            <ContentWaterfall data={props.homeData.waterfall} />
            <LatestArticle data={props.data} pages={props.pages} />
            <Recommend />
          </div>
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
    </>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;
  let pageSize = 10;
  if (query.limit) {
    pageSize = query.limit;
  }

  const article = fetch(
    "http://localhost:8000/api/article/getArticle?pageSize=" + pageSize
  ).then((res) => res.json());

  const home = fetch("http://localhost:8000/api/blogdata").then((res) =>
    res.json()
  );

  let data = [],
    pages = {},
    homeData = {};
  try {
    const [res1, res2] = await Promise.all([article, home]);

    if (res1.code) {
      const { records, total, pageSize, currentPage } = res1.data;
      data = records;
      pages = {
        total,
        pageSize,
        currentPage,
      };
    }
    if (res2.code) {
      homeData = res2.data;
    }
    return { props: { data, pages, homeData } };
  } catch (error) {
    return { props: { data, pages, homeData } };
  }
}
