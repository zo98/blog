import React, { Component } from 'react'
import { Table, Button, Row, Col, Input, Space } from "antd";
import dynamic from "next/dynamic";
const { Search } = Input;
// 动态引入
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});
export default class System_manage extends Component {
  render() {
    return (
      <Menu>
        <div>系统管理</div>
      </Menu>
    )
  }
}
