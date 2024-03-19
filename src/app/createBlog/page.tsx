"use client";
import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Navbar } from "@/components/ui/navbar";
import "./style.css";
Quill.register("modules/imageResize", ImageResize);

const CreateBlogPage = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState<string>("");
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

  const quill = useRef<any>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const modules = useMemo(
    () => ({
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
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

  return (
    <>
      <Navbar />
      <div className="mx-auto  max-w-7xl  justify-between px-4 py-2 sm:px-6 lg:px-8 h-auto">
        <textarea
          ref={textareaRef}
          value={title}
          onChange={handleChange}
          rows={1}
          className="border-b-[1px] border-slate-300 h-auto mt-4 py-3 px-2 resize-none outline-none bg-transparent w-full  text-4xl font-bold overflow-hidden"
          placeholder="Title"
        />
        <ReactQuill
          ref={(el) => (quill.current = el)}
          className="font-mono text-2xl"
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Tell your story..."
        />
      </div>
    </>
  );
};

export default CreateBlogPage;
