import React, { Component } from "react";
import { Table, Button, Row, Col, Input, Space } from "antd";
import dynamic from "next/dynamic";
import { verifyToken } from "@/common/verifyToken";
const { Search } = Input;
import Head from "next/head";
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});
export default class System_manage extends Component {
  render() {
    return (
      <Menu>
        <Head>
          <title>后台管理-系统管理</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div>系统管理</div>
      </Menu>
    );
  }
}
export async function getServerSideProps(context) {
  const query = context.query;
  return await verifyToken(query.token);
}
