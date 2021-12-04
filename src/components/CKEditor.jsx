import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";

export default class Editor extends Component {
  constructor(props) {
    super(props);
  }
  onEditorChange = (value) => {
    this.props.onChange?.(value);
  };
  componentDidMount() {

  }
  render() {
    return (
      <>
        <CKEditor
          editor={ClassicEditor}
          data={this.props.value}
          config={{ language: "zh-cn" }}
          onReady={(editor) => {

          }}
          onChange={(event, editor) => {
            const data = editor.getData();
          }}
          onBlur={(event, editor) => {
          }}
          onFocus={(event, editor) => {
          }}
        />
      </>
    );
  }
}
