import React from "react";
import { Table, Button, Row, Col, Input, Space } from "antd";
import { useState, useEffect } from "react";
import axios from "@/http/service";
const dayjs = require("dayjs");
import dynamic from "next/dynamic";
const { Search } = Input;
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});
export default function ClassifyManage() {
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
      render() {
        return <Button>删除</Button>;
      },
    },
  ];
  const inputChange = (e) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };
  const loadData = async (params) => {
    try {
      setLoading(true);
      const { pageSize, currentPage } = pages;
      const { data } = await axios({
        url: "/api/classify/getClassify",
        params: {
          pageSize,
          currentPage,
          keyWords: value,
          ...params,
        },
      });
      setLoading(false);
      if (data.code) {
        const tempPages = {
          pageSize: Number(data.data.pageSize),
          currentPage: Number(data.data.currentPage),
          total: Number(data.data.total),
        };
        setData(data.data.records);
        setPages(tempPages);
      }
    } catch (error) {}
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

  useEffect(() => {
    console.log(12345);
  });

  return (
    <Menu>
      <Space size={18} direction="vertical" style={{ width: "100%" }}>
        <Row>
          <Col span="24"></Col>
          <Col span="5">
            <Search
              value={value}
              onChange={inputChange}
              placeholder="分类名称"
            />
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
            // 只有一页时隐藏分页器
            hideOnSinglePage: true,
            onChange: pagesChange,
          }}
        />
      </Space>
    </Menu>
  );
}
