import { Layout, Menu, ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { useRouter } from "next/router";
const { Header, Sider, Content } = Layout;
import styles from "@/cStyles/menu/menu.module.scss";
export default function Index(props) {
  const router = useRouter();
  const clickMenu = ({ key }) => {
    router.push(key);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ height: "100%" }}>
        <Header>Header</Header>
        <Layout>
          <Sider style={{ overflowY: "scroll" }}>
            <Menu onClick={clickMenu} defaultSelectedKeys={["1"]}>
              <Menu.Item key="/admin">首页</Menu.Item>
              <Menu.Item key="/admin/classify-manage">分类管理</Menu.Item>
              <Menu.Item key="/admin/article-edit">新增文章</Menu.Item>
              <Menu.Item key="/admin/article-manage">文章管理</Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ overflowX: "hidden", padding: "10px" }}>
            <div className={styles.container}>{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
