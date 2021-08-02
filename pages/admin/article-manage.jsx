import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Page = dynamic(() => import("@/components/admin/article-manage.jsx"), {
  ssr: false,
});
const Edit = dynamic(() => import("@/components/admin/article-edit.jsx"), {
  ssr: false,
});

export default function ArticleManage() {
  const router = useRouter();
  return router.query.id ? <Edit /> : <Page />;
}
