import { Editor } from "@tinymce/tinymce-react";

import React, { Component } from "react";

export default class TinymceEditor extends Component {
  constructor(props) {
    super(props);
  }
  onEditorChange = (value) => {
    this.props.onChange?.(value);
  };
  render() {
    return (
      <>
        <Editor
          value={this.props.value}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          onEditorChange={this.onEditorChange}
          init={{
            menubar: true,
            toolbar: true,
            language: "zh_CN",
            language_url: "/tinymce/langs/zh_CN.js",
            fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
            plugins:
              "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave  indent2em autoresize  axupimgs",
            toolbar:
              "code undo redo restoredraft fullscreen | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview |  indent2em lineheight  axupimgs",
            font_formats:
              "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            tinymceScriptSrc: "/tinymce/tinymce.min.js",
          }}
        />
      </>
    );
  }
}
