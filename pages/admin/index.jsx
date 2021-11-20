import React from "react";
import dynamic from "next/dynamic";
import { verifyToken } from "@/common/verifyToken";
import Head from 'next/head'
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});

export default function index() {
  return (
    <Menu>
      <Head>
        <title>后台管理-首页</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>首页</div>
    </Menu>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;
  return await verifyToken(query.token);
}
