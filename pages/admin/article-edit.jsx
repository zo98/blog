import { useEffect, useState } from "react";
import { Row, Col, Input, Select, Form, Button, Space } from "antd";
import dynamic from "next/dynamic";
import axios from "@/http/service";

const { Option } = Select;
const Menu = dynamic(() => import("@/components/menu/index.jsx"), {
  ssr: false,
});
export default function ArticleEdit() {
  const getNode = (node) => {
    // tinymce.init({
    //   selector: "#edit",
    //   menubar: true,
    //   toolbar: true,
    //   language: "zh_CN",
    //   language_url: "http://localhost:3000/tinymce/langs/zh_CN.js",
    //   fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
    //   plugins:
    //     "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave  indent2em autoresize  axupimgs",
    //   toolbar:
    //     "code undo redo restoredraft fullscreen | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview |  indent2em lineheight  axupimgs",
    //   font_formats:
    //     "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
    //   content_style:
    //     "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    // });
  };
  const [classifyOptions, setOptions] = useState([]);

  useEffect(async () => {
    try {
      const { data } = await axios.get("/api/classify/getClassify");
      if (data.code) {
        setOptions(data.data.records);
      }
    } catch (error) {}
  }, []);

  return (
    <>
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
                    <Select>
                      {classifyOptions.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.classify_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={24}>
            <div ref={getNode} id="edit"></div>
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
