import React, { Component } from "react";
import dynamic from "next/dynamic";
import { verifyToken } from "@/common/verifyToken";
import Head from "next/head";
const Page = dynamic(() => import("@/components/admin/article-edit.jsx"), {
  ssr: false,
});
export default class ArticleEdit extends Component {
  render() {
    return (
      <>
        <Head>
          <title>后台管理-新增文章</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Page />
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const query = context.query;
  return await verifyToken(query.token);
}
