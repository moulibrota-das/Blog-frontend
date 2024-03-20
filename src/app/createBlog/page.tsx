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
import useAuth from "@/context/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

Quill.register("modules/imageResize", ImageResize);

const CreateBlogPage = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState<string>("");
  const { authId, authToken } = useAuth();

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

  const handleSubmit = async () => {
    console.log(authId);
    const id = localStorage.getItem("id");
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `http://localhost:4000/blog/${id}`,
        {
          title: title,
          description: title,
          content: value,
          authorId: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      <div className="mx-auto   max-w-5xl  px-4 py-2 md:px-[8rem] lg:px-[8rem] h-auto">
        <textarea
          ref={textareaRef}
          value={title}
          onChange={handleChange}
          rows={1}
          className="border-b-[1px] border-slate-300 h-auto py-3 px-2 resize-none outline-none bg-transparent w-full  text-3xl font-bold overflow-hidden"
          placeholder="Title"
        />
        <ReactQuill
          ref={(el) => (quill.current = el)}
          className=""
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Tell your story..."
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="justify-self-end rounded-md border border-black bg-slate-800 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default CreateBlogPage;
