import React, { Component } from "react";
import dynamic from "next/dynamic";
const Page = dynamic(() => import("@/components/admin/article-edit.jsx"), {
  ssr: false,
});
export default class ArticleEdit extends Component {
  render() {
    return <Page />;
  }
}
