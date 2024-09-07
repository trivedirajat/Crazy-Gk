import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import ImageCompress from "quill-image-compress";

// Register custom modules
Quill.register("modules/imageCompress", ImageCompress);
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

const FontAttributor = Quill.import("attributors/class/font");
FontAttributor.whitelist = [
  "Roboto",
  "Raleway",
  "Montserrat",
  "Lato",
  "Rubik",
  "Hind",
  "Anek-Devanagari",
  "Cairo",
  "Kalnia Glaze",
  "Amiko",
  "sans-serif",
  "serif",
  "monospace",
];
Quill.register(FontAttributor, true);

const formats = [
  "align",
  "background",
  "blockquote",
  "bold",
  "code-block",
  "color",
  "float",
  "font",
  "header",
  "height",
  "image",
  "italic",
  "link",
  "script",
  "strike",
  "size",
  "underline",
  "width",
  "list",
  "indent",
];

const modules = {
  toolbar: [
    [{ font: FontAttributor.whitelist }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ],
  imageCompress: {
    quality: 0.6,
    maxWidth: 1000,
    maxHeight: 1000,
    imageType: "image/jpeg",
    debug: false,
    suppressErrorLogging: false,
    handleOnPaste: true,
    insertIntoEditor: undefined,
  },
  imageActions: {},
  imageFormats: {},
  imageDrop: true,
};

// Forward ref to access ReactQuill instance
const QuillTextEditor = forwardRef(
  ({ value, setContent, style, ...props }, ref) => {
    // Use imperative handle to expose methods if needed
    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef.current.getEditor(),
    }));

    const quillRef = React.useRef(null);

    return (
      <ReactQuill
        ref={ref}
        style={{ maxHeight: "500px", width: "100%", ...style }}
        theme="snow"
        value={value}
        onChange={(value) => setContent(value)}
        modules={modules}
        formats={formats}
        {...props}
      />
    );
  }
);

export default QuillTextEditor;
