import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
import Content from "@/components/content/content";
import Header from "@/components/header/index";
import Article from "@/components/article/index";
export default function Index(props) {
  console.log(props);
  return (
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
        <SiderBar>
          <SiderBarList />
        </SiderBar>
      </div>
    </main>
  );
}
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();
  return { props: { data } };
}
