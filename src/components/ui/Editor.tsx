"use client";

import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  SetStateAction,
} from "react";
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./style.css";
import dynamic from "next/dynamic";

// Quill.register("modules/imageResize", ImageResize);
interface Props {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}

const Editor = ({ value, setValue }: Props) => {
  // const [value, setValue] = useState("");

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const modules = useMemo(
    () => ({
      // imageResize: {
      //   // parchment: Quill.import("parchment"),
      //   modules: ["Resize", "DisplaySize"],
      // },
      toolbar: [
        [{ header: "1" }, { header: "2" }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
      ],
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <ReactQuill
      // ref={(el: any) => (quill.current = el)}
      className=""
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      placeholder="Tell your story..."
    />
  );
};

export default Editor;
