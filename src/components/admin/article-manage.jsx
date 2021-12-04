import React from "react";
import { Table, Button, Row, Col, Input, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "@/http/service";
const dayjs = require("dayjs");
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import clamp from "clamp-js";
const { Search } = Input;
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});
export default function ClassifyManage(props) {
  const router = useRouter();
  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      align: "center",
      ellipsis: true,
    },
    {
      title: "分类",
      dataIndex: "classify_name",
      align: "center",
      ellipsis: true,
    },
    {
      title: "预览",
      dataIndex: "preview_content",
      align: "center",
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      align: "center",
      ellipsis: true,
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
      ellipsis: true,
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
      dataIndex: "id",
      ellipsis: true,
      render(id) {
        return (
          <Space>
            <Button
              size="small"
              onClick={() => {
                router.push({
                  pathname: "/admin/article-manage",
                  query: { id, token: localStorage.token },
                });
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
      const { data } = await axios({
        url: "/api/article/getArticle",
        params: {
          pageSize,
          currentPage,
          keyWords: value,
          ...params,
        },
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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [pages, setPages] = useState({
    pageSize: 10,
    currentPage: 1,
    total: 0,
  });
  useEffect(async () => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [value]);

  return (
    <Menu>
      <Space size={18} direction="vertical" style={{ width: "100%" }}>
        <Row>
          <Col span={5}>
            <Search value={value} onChange={inputChange} placeholder="标题" />
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
      </Space>
    </Menu>
  );
}
