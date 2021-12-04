import React, { Component } from "react";
import dynamic from "next/dynamic";
import { verifyToken } from "@/common/verifyToken";
import Head from "next/head";
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});
const Edit = dynamic(() => import("@/components/admin/system-edit.jsx"), {
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
        <Edit />
      </Menu>
    );
  }
}
export async function getServerSideProps(context) {
  const query = context.query;
  return await verifyToken(query.token);
}
