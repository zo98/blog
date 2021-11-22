import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Input, Space, Modal, Form } from "antd";
import { verifyToken } from "@/common/verifyToken";

import { classify as classifyApi } from "@/http/api";
const dayjs = require("dayjs");
import dynamic from "next/dynamic";
import Head from "next/head";
const { Search } = Input;
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});

import UploadImage from "@/components/UploadImage.jsx";
export default function ClassifyManage() {
  const [currentRow, setCurrentRow] = useState();
  const [form] = Form.useForm();
  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      align: "center",
      render(val) {
        if (val) {
          return dayjs(val).format("YYYY/MM/DD HH:mm:ss");
        }
        return;
      },
    },
    {
      title: "修改时间",
      dataIndex: "update_time",
      align: "center",
      render(val) {
        if (val) {
          return dayjs(val).format("YYYY/MM/DD HH:mm:ss");
        }
        return;
      },
    },
    {
      title: "操作",
      align: "center",
      render(value) {
        return (
          <Space>
            <Button
              size="small"
              onClick={() => {
                onEdit(value);
              }}
            >
              编辑
            </Button>
            <Button danger size="small">
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const inputChange = (e) => {
    setValue(e.target.value);
  };
  const loadData = async (params) => {
    try {
      setLoading(true);
      const { pageSize, currentPage } = pages;

      const { data } = await classifyApi.getClassify({
        pageSize,
        currentPage,
        keyWords: value,
        ...params,
      });
      if (data.code) {
        const tempPages = {
          pageSize: Number(data.data.pageSize),
          currentPage: Number(data.data.currentPage),
          total: Number(data.data.total),
        };
        setData(data.data.records);
        setPages(tempPages);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const pagesChange = (page, pageSize) => {
    loadData({
      pageSize,
      currentPage: page,
    });
  };
  // 表格数据
  const [data, setData] = useState([]);
  // 搜索load
  const [loading, setLoading] = useState(false);
  // 搜索
  const [value, setValue] = useState("");
  // 弹框
  const [visible, setVisible] = useState(false);
  // 分页
  const [pages, setPages] = useState({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  });

  const closeModal = () => {
    setCurrentRow(undefined);
    setVisible(false);
  };

  const onEdit = (value) => {
    setCurrentRow(value);
    setVisible(true);
  };
  // updated
  const onFinish = async (values) => {
    const { id } = currentRow;
    try {
      const { data } = await classifyApi.updateClassify({
        id,
        ...values,
      });
    } catch (error) {}
  };

  useEffect(async () => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [value]);

  useEffect(() => {
    currentRow && form.setFieldsValue(currentRow);
  }, [currentRow]);

  return (
    <Menu>
      <Head>
        <title>后台管理-分类管理</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Space size={18} direction="vertical" style={{ width: "100%" }}>
        <Row>
          <Col span="5">
            <Search
              value={value}
              onChange={inputChange}
              placeholder="分类名称"
            />
          </Col>
          <Col offset="17" span="2">
            <Button
              onClick={() => {
                setVisible(true);
              }}
              className="rfloat"
              type="primary"
            >
              新增
            </Button>
          </Col>
        </Row>
        <Table
          loading={loading}
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={{
            position: ["bottomRight"],
            total: pages.total,
            size: "small",
            onChange: pagesChange,
          }}
        />

        <Modal
          title="添加分类"
          visible={visible}
          onCancel={closeModal}
          onOk={() => {
            form.submit();
          }}
        >
          <Form onFinish={onFinish} form={form}>
            <Form.Item
              label="分类名称"
              name="name"
              rules={[{ required: true, message: "请输入分类名称" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="分类封面" name="cover">
              <UploadImage />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </Menu>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;
  return await verifyToken(query.token);
}
