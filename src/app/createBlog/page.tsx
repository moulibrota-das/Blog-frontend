"use client";
import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  ChangeEvent,
} from "react";
// import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Navbar } from "@/components/ui/navbar";
import "./style.css";
import useAuth from "@/context/useAuth";
import axios from "../../lib/api";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

// Quill.register("modules/imageResize", ImageResize);

const CreateBlogPage = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { authId, authToken } = useAuth();
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

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
    setLoading(true);
    console.log(authId);
    const id = localStorage.getItem("id");
    const token = Cookies.get("token");
    if (title === "" || value === "" || id === "") {
      setLoading(false);
      throw new Error("Cannot leave Title or Content blank");
    }
    try {
      const response = await axios.post(
        `blog/${id}`,
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

      if (response.status === 200) {
        router.push("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
        // parchment: Quill.import("parchment"),
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
          // ref={(el: any) => (quill.current = el)}
          className=""
          theme="snow"
          value={value}
          onChange={setValue}
          // modules={modules}
          formats={formats}
          placeholder="Tell your story..."
        />
        {/* <button
          type="button"
          onClick={handleSubmit}
          className="justify-self-end rounded-md border border-black bg-slate-800 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Publish
        </button> */}
        <Button
          onClick={handleSubmit}
          loading={loading}
          className="min-w-32 min-h-10 justify-self-end rounded-md border border-black bg-slate-800 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Publish
        </Button>
      </div>
    </>
  );
};

export default CreateBlogPage;
