// 后台登录页面
import { Card, Form, Input, Button } from "antd";
import styles from "@/cStyles/user/login.module.scss";
import { user as userApi } from "@/http/api";

export default function Index() {
  const login = (data) => {
    userApi
      .login(data)
      .then((res) => {
        if (res.data.data) {
          localStorage.token = res.data.data.token;
          location.href = "/admin";
        }
      })
      .catch((err) => {});
  };
  return (
    <div className={styles.container}>
      <Card hoverable className={styles.login}>
        <Form onFinish={login}>
          <Form.Item label="账户" name="account">
            <Input autoComplete="true" />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password autoComplete="true" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className={styles.login_btn}
              type="primary"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
