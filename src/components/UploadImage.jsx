import React from "react";
import { Upload, Image } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export default function UploadImage(props) {
  const uploadButton = (
    <div>
      <UploadOutlined />
    </div>
  );
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
        listType="picture-card"
        showUploadList={false}
        headers={{
          Authorization: "Bear " + localStorage.token,
        }}
      >
        {uploadButton}
      </Upload>
      {/* {props.value ? <Image src={props.value} /> : null} */}
    </>
  );
}
