import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
import Content from "@/components/content/content";
import Header from "@/components/header/index";
import Article from "@/components/article/index";
import autoRem from "@/common/autoRem";
import React from "react";
export default function Index(props) {
  autoRem();
  return (

      <main className="main">
        <div className="main-menu">
          <Header data={props.homeData.config} />
        </div>
        <div className="main-content">
          <Content>
            <Article data={props.data}/>
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
   
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const article = fetch(
    `http://localhost:8000/api/article/getArticle?id=${id}`
  ).then((res) => res.json());

  const home = fetch("http://localhost:8000/api/blogdata").then((res) =>
    res.json()
  );

  let data = [],
    homeData = [];
  try {
    const [res1, res2] = await Promise.all([article, home]);

    if (res1.code) {
      data = res1.data;
    }
    if (res2.code) {
      homeData = res2.data;
    }
    return { props: { data, homeData } };
  } catch (error) {
    return { props: { data, homeData } };
  }
}
