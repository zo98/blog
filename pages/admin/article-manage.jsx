import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { verifyToken } from "@/common/verifyToken";
import Head from "next/head";
const Page = dynamic(() => import("@/components/admin/article-manage.jsx"), {
  ssr: false,
});
const Edit = dynamic(() => import("@/components/admin/article-edit.jsx"), {
  ssr: false,
});

export default function ArticleManage() {
  const router = useRouter();
  return router.query.id ? (
    <>
      <Head>
        <title>后台管理-文章编辑</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Edit />
    </>
  ) : (
    <>
      <Head>
        <title>后台管理-文章管理</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Page />
    </>
  );
}
export async function getServerSideProps(context) {
  const query = context.query;
  return await verifyToken(query.token);
}
