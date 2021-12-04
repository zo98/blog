import { useEffect, useRef } from "react";
import { Form, Input, Space, Button } from "antd";
import UploadImage from "@/components/UploadImage.jsx";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { system } from "@/http/api";
export default function systemEdit() {
  const formRef = useRef();
  useEffect(async () => {
    const { data } = await system.getSystemInfo();
    if (data.code) {
      formRef.current.setFieldsValue(data.data);
    }
  }, []);

  const renderMenuForm = (fields, { add, remove }) => {
    return (
      <>
        <Form.Item label="侧边栏菜单">
          {fields.map(({ key, name, fieidKey, ...restFieid }) => (
            <Space
              size={20}
              align="baseline"
              key={key}
              style={{ display: "flex" }}
            >
              <Form.Item name={[name, "name"]}>
                <Input />
              </Form.Item>
              <Form.Item name={[name, "url"]}>
                <Input />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            />
          </Form.Item>
        </Form.Item>
      </>
    );
  };
  const renderContactForm = (fields, { add, remove }) => {
    return (
      <Form.Item label="联系">
        {fields.map(({ key, name, fieidKey, ...restFieid }) => (
          <div key={key}>
            <Space size={20} align="baseline" style={{ display: "flex" }}>
              <Form.Item name={[name, "name"]}>
                <Input />
              </Form.Item>
              <Form.Item name={[name, "url"]}>
                <Input />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>

            <Form.Item name={[name, "icon"]}>
              <Input.TextArea rows={10} />
            </Form.Item>
          </div>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            onClick={() => add()}
            block
            icon={<PlusOutlined />}
          />
        </Form.Item>
      </Form.Item>
    );
  };

  const onFinish = (values) => {
    system.updateSystemInfo(values);
  };

  return (
    <main>
      <Form onFinish={onFinish} ref={formRef}>
        <Form.Item label="博客名称">
          <Form.Item name={["blog", "title"]}>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="博客简介">
          <Form.Item name={["blog", "description"]}>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="logo">
          <Form.Item name={["blog", "favicon"]}>
            <UploadImage />
          </Form.Item>
        </Form.Item>
        <Form.Item label="头像">
          <Form.Item name={["blog", "profile"]}>
            <UploadImage />
          </Form.Item>
        </Form.Item>
        <Form.List name="menu">{renderMenuForm}</Form.List>
        <Form.List name="contact">{renderContactForm}</Form.List>
        <Form.Item label="ipc">
          <Form.Item name={["ipc", "text"]}>
            <Input />
          </Form.Item>
          <Form.Item name={["ipc", "url"]}>
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
