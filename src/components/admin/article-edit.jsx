import {
  Row,
  Col,
  Input,
  Select,
  Form,
  Button,
  Space,
  Spin,
  message,
} from "antd";
import { withRouter } from "next/router";
import axios from "@/http/service";
import React, { Component } from "react";
import Menu from "@/components/menu/index.jsx";
import Editor from "@/components/TinymceEditor.jsx";
// import Editor from "@/components/CKEditor.jsx";
class ArticleEdit extends Component {
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
      formRuls: {
        title: [
          { required: true, message: "标题不能为空" },
          {
            validator: (rule, value, callback) => {
              if (/\s/.test(value)) {
                return Promise.reject("标题不能包含空白字符");
              } else {
                return Promise.resolve();
              }
            },
          },
        ],
        classify: [{ required: true, message: "请选择文章分类" }],
      },
      initialValues: null,
      loadingArticle: false,
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
          label: item.name,
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
  onFinish = (values) => {
    const { router } = this.props;
    if (router.query.id) {
      values.id = Number(router.query.id);
    }

    axios({
      url: "/api/article/updateArticle",
      method: "POST",
      data: values,
    })
      .then(({ data }) => {
        if (data.code) {
          message.success(values.id ? "保存成功" : "发表成功");
          setTimeout(() => {
            this.props.router.back();
          }, 500);
        } else {
          message.error(values.id ? "保存失败" : "发表失败");
        }
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {});
  };
  loadArticleData = (id) => {
    this.setState({ loadingArticle: true });
    axios({
      url: "/api/article/getArticle",
      params: { id },
    })
      .then(({ data }) => {
        if (data.code) {
          this.setState(
            {
              initialValues: data.data[0],
            },
            () => {
              this.state.formRef.setFieldsValue(this.state.initialValues);
            }
          );
        }
      })
      .catch(() => {})
      .finally(this.setState({ loadingArticle: false }));
  };
  componentDidMount() {
    const { router } = this.props;
    if (router && router.query.id) {
      this.loadArticleData(router.query.id);
    }
    this.loadData();
  }

  render() {
    const { router } = this.props;
    const { loadingArticle } = this.state;
    return (
      <>
        <Menu>
          {loadingArticle ? (
            <Span />
          ) : (
            <Row gutter={[20, 30]}>
              <Col span={24}>
                <Form
                  onFinish={this.onFinish}
                  ref={(node) => {
                    this.state.formRef = node;
                  }}
                >
                  <Row gutter={20}>
                    <Col span={14}>
                      <Form.Item
                        label="标题："
                        name="title"
                        rules={this.state.formRuls.title}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={14}>
                      <Form.Item
                        label="分类："
                        name="classify_id"
                        rules={this.state.formRuls.classify}
                      >
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
                  <Row>
                    <Col span={24}>
                      <Form.Item name="content">
                        <Editor />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      <Space>
                        <Button type="ghost">保存为草稿</Button>
                        <Button type="primary" htmlType="submit">
                          {router.query.id ? "保存" : "发表"}
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )}
        </Menu>
      </>
    );
  }
}

export default withRouter(ArticleEdit);
