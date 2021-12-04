import React from "react";
import { Upload, Image, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function UploadImage(props) {
  console.log(props);
  return (
    <>
      <Upload
        accept="image/*"
        maxCount={1}
        action="/api/upload/uploadimg"
        showUploadList={false}
        onChange={(file) => {
          if (file.file.response) {
            props?.onChange(file.file.response.location);
          }
        }}
        headers={{
          Authorization: "Bear " + localStorage.token,
        }}
      >
        {props.value ? (
          <img width={200} src={props.value} />
        ) : (
          <Button icon={<UploadOutlined />}></Button>
        )}
      </Upload>
    </>
  );
}
