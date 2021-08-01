import dynamic from "next/dynamic";
const Page = dynamic(() => import("@/components/admin/article-manage.jsx"), {
  ssr: false,
});
export default function ArticleManage() {
  return <Page />;
}
