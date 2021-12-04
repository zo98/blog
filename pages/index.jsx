import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
// import Content from "@/components/content/content";
import ContentWaterfall from "@/components/content/contentWaterfall";
import LatestArticle from "@/components/content/contentLatestArticle";
import Recommend from "@/components/content/contentRecommend";
import Header from "@/components/header/index";
import autoRem from "@/common/autoRem";
import { BackTop } from "antd";
import { getArticles, getHomeData, getHotClassify } from "@/http/serviceSide";
import Head from "next/head";
export default function Index(props) {
  autoRem();

  return (
    <>
      <BackTop />
      <Head>
        <title key="title">首页</title>
      </Head>
      <main className="main">
        <div className="main-menu">
          <Header data={props.homeData.config} />
        </div>
        <div className="main-content">
          <div className="container">
            <ContentWaterfall data={props.homeData.waterfall} />
            <LatestArticle data={props.data} pages={props.pages} />
            <Recommend data={props.hotClassifyData} />
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

  const [article, home, hotClassify] = await Promise.all([
    getArticles({ pageSize }),
    getHomeData(),
    getHotClassify(),
  ]);

  const { records, total, pageSize: pageSizeS, currentPage } = article.data;
  const data = records;
  const pages = {
    total,
    pageSize: pageSizeS,
    currentPage,
  };

  const homeData = home.data;
  const hotClassifyData = hotClassify.data.records;
  return { props: { data, pages, homeData, hotClassifyData } };
}
