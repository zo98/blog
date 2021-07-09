import React from "react";
import { Table } from "antd";
import dynamic from "next/dynamic";
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});
export default function ArticleManage() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  return (
    <Menu>
      <div>管理</div>
      <Table />
    </Menu>
  );
}
