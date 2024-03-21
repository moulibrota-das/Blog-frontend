import axios from "../../../lib/api";
import React from "react";
import "./style.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/Footer";

const getBlogs = async (id: string) => {
  try {
    const response = await axios.get(`blog/${id}`);
    if (response) {
      // setBlogs(response.data);
      return response.data;
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: { params: { id: string } }) => {
  let blog = await getBlogs(params.id);
  return (
    <>
      <Navbar />
      <div className="mx-auto   max-w-4xl  px-6 py-2  md:px-[8rem] lg:px-[8rem] h-auto">
        {blog && (
          <div
            className="border-b-[1px] border-slate-300 h-auto py-3   bg-transparent w-full  text-3xl font-bold overflow-hidden"
            dangerouslySetInnerHTML={{ __html: blog.title }}
          />
        )}
        {blog && (
          <div
            className="blog-container pt-6 pb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default page;
