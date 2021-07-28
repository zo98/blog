import { Row, Col, Input, Select, Form, Button, Space } from "antd";
import dynamic from "next/dynamic";
import axios from "@/http/service";
import Head from "next/head";
import { Editor } from "@tinymce/tinymce-react";
import React, { Component } from "react";
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});

export default class ArticleEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      options: [],
      optionsLoading: false,
      pages: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  }

  onPopupScroll = async (e) => {
    e.persist();

    if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight) {
      const { total, currentPage, pageSize } = this.state.pages;
      if (Math.ceil(total / pageSize) > currentPage) {
        this.loadData({ currentPage: currentPage + 1 });
        this.setState((state) => ({
          pages: { ...state.pages, currentPage: state.pages.currentPage + 1 },
        }));
      }
    }
  };
  onSearch = (keyWords) => {
    this.setState(
      (state) => ({
        options: [],
        value: keyWords,
        pages: { ...state.pages, currentPage: 1 },
      }),
      () => {
        this.loadData();
      }
    );
  };
  onSelect = (val) => {
    this.setState({ value: val });
  };
  loadData = async (params) => {
    const { pageSize, currentPage } = this.state.pages;
    this.setState({ optionsLoading: true });
    try {
      const { data } = await axios({
        url: "/api/classify/getClassify",
        params: {
          pageSize,
          currentPage,
          keyWords: this.state.value,
          ...params,
        },
      });
      if (data.code) {
        let temp = data.data.records.map((item) => ({
          label: item.classify_name,
          value: item.id,
        }));

        this.setState((state) => ({
          pages: { ...state.pages, total: data.data.total },
          options: [...state.options, ...temp],
        }));
      }
    } catch (error) {
    } finally {
      this.setState({ optionsLoading: false });
    }
  };
  componentDidMount() {
    this.loadData();
    console.log("componentDidMount");
  }

  render() {
    return (
      <>
        <Head>
          <script src="/tinymce/tinymce.min.js"></script>
        </Head>
        <Menu>
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <Form>
                <Row gutter={20}>
                  <Col span={8}>
                    <Form.Item label="标题：">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="分类：">
                      <Select
                        value={this.state.value}
                        showSearch
                        loading={this.state.optionsLoading}
                        onPopupScroll={this.onPopupScroll}
                        onSearch={this.onSearch}
                        value={this.state.value}
                        options={this.state.options}
                        filterOption={false}
                        onSelect={this.onSelect}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={24}>
              <Editor
                init={{
                  menubar: true,
                  toolbar: true,
                  language: "zh_CN",
                  language_url: "/tinymce/langs/zh_CN.js",
                  fontsize_formats:
                    "12px 14px 16px 18px 24px 36px 48px 56px 72px",
                  plugins:
                    "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave  indent2em autoresize  axupimgs",
                  toolbar:
                    "code undo redo restoredraft fullscreen | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview |  indent2em lineheight  axupimgs",
                  font_formats:
                    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </Col>
            <Col span={4}>
              <Space>
                <Button type="ghost">保存为草稿</Button>
                <Button type="primary">发表</Button>
              </Space>
            </Col>
          </Row>
        </Menu>
      </>
    );
  }
}
