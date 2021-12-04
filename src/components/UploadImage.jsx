import React from "react";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function UploadImage(props) {
  return (
    <>
      <Upload
        accept="image/*"
        maxCount={1}
        action="/api/upload/uploadimg"
        listType="picture-card"
        onChange={(file) => {
          if (file.file.response) {
            props?.onChange(file.file.response.location);
          }
        }}
        headers={{
          Authorization: "Bear " + localStorage.token,
        }}
      >
        {<UploadOutlined />}
      </Upload>
    </>
  );
}
