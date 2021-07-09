import React from "react";
import dynamic from "next/dynamic";
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});

export default function index() {
  return (
    <Menu>
      <div>首页</div>
    </Menu>
  );
}
