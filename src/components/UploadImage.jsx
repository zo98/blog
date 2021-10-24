import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Image, Button } from "antd";
export default function UploadImage(props) {
  console.log(props);
  return (
    <>
      <Upload
        accept="image/*"
        maxCount={1}
        action="/api/classify/uploadimg"
        listType="text"
        onChange={(file) => {
          if (file.file.response) {
            props?.onChange(file.file.response);
          }
        }}
      >
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
      {props.value ? <Image src={props.value} /> : null}
    </>
  );
}
