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
    console.log(this.props);
  }
  render() {
    return (
      <>
        <CKEditor
          editor={ClassicEditor}
          data={this.props.value}
          config={{ language: "zh-cn" }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </>
    );
  }
}
