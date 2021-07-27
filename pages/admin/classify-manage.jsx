import React from "react";
import { Table, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "@/http/service";
import dynamic from "next/dynamic";
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});
export default function ClassifyManage() {
  const columns = [
    {
      title: "分类名称",
      dataIndex: "classify_name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      render(val) {
        return 123;
      },
    },
    {
      title: "修改时间",
      dataIndex: "update_time",
    },
    {
      title: "操作",
      render() {
        return <Button>删除</Button>;
      },
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    try {
      setLoading(true);
      const { data } = await axios({
        url: "/api/classify/getClassify",
      });
      setLoading(false);
      if (data.code) {
        setData(data.data.records);
      }
      // console.log(data);
    } catch (error) {}
  }, []);
  return (
    <Menu>
      <div>分类</div>
      <Table
        loading={loading}
        rowKey="id"
        columns={columns}
        dataSource={data}
      />
    </Menu>
  );
}
