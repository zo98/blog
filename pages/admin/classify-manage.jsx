import React from "react";
import { Table } from "antd";
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
      render() {
        return 123;
      },
    },
    {
      title: "修改时间",
      dataIndex: "age",
    },
    {
      title: "操作",
      dataIndex: "age",
    },
  ];
  const [data, setData] = useState([]);
  useEffect(async () => {
    try {
      const { data } = await axios({
        url: "/api/classify/getClassify",
      });
      if (data.code) {
        setData(data.data);
      }
      console.log(data);
    } catch (error) {}
  }, []);
  return (
    <Menu>
      <div>分类</div>
      <Table rowKey="id" columns={columns} dataSource={data} />
    </Menu>
  );
}
