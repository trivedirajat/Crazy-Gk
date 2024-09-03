import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
// import { io } from 'socket.io-client';

// Register the custom modules
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
  imageActions: {},
  imageFormats: {},
  imageDrop: true,
};

export default function QuillTextEditor({
  value,
  setContent,
  ref,
  style,
  ...props
}) {
  //   const [value, setValue] = useState('');
  //   const [socket, setSocket] = useState(null);

  //   useEffect(() => {
  //     const s = io("http://localhost:3001");
  //     setSocket(s);

  //     s.on('document-update', (newValue) => {
  //       setValue(newValue);
  //     });

  //     return () => {
  //       s.disconnect();
  //     };
  //   }, []);

  //   const handleChange = (content, delta, source, editor) => {
  //     setValue(content);
  //     if (socket && source === 'user') {
  //       socket.emit('document-change', content);
  //     }
  //   };

  return (
    <ReactQuill
      ref={ref}
      style={{ height: "500px", width: "100%", ...style }} // Uncomment and check styling once
      className="container"
      theme="snow"
      value={value}
      tabIndex={1}
      //   onBlur={(value) => setContent(value)} //<======= Throwing error. Check Once =======>
      onChange={(value) => setContent(value)}
      modules={modules}
      formats={formats}
      {...props}
    />
  );
}
