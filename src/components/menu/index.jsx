import { Layout, Menu, ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import { useRouter } from "next/router";
import menuConfig from "@/common/menuConfig";
const { Header, Sider, Content } = Layout;
import styles from "@/cStyles/menu/menu.module.scss";
export default function Index(props) {
  const router = useRouter();
  const clickMenu = ({ key }) => {
    router.push({
      pathname: key,
      query: {
        token: localStorage.token,
      },
    });
  };
  const getSelectedKeys = () => {
    const temp = menuConfig.filter((item) => item.path === location.pathname);
    return temp.map((item) => item.path);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ height: "100%" }}>
        <Header>Header</Header>
        <Layout>
          <Sider style={{ overflowY: "auto" }}>
            <Menu onClick={clickMenu} defaultSelectedKeys={getSelectedKeys()}>
              {menuConfig.map((item) => (
                <Menu.Item key={item.path}>{item.name}</Menu.Item>
              ))}
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
