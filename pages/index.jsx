import SiderBar from "@/components/siderBar/siderBar";
import SiderBarList from "@/components/siderBar/siderBarList";
import Content from "@/components/content/content";
export default function Index() {
  return (
    <main className="main">
      <div className="main-menu">123</div>
      <div className="main-content">
        <Content></Content>
      </div>
      <div className="main-siderbar">
        <SiderBar>
          <SiderBarList />
        </SiderBar>
      </div>
    </main>
  );
}
