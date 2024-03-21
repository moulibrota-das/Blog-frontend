import axios from "axios";
import React from "react";
import "./style.css";

const getBlogs = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:4000/blog/${id}`);
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
    <div className="mx-auto   max-w-4xl  px-6 py-2 md:px-[8rem] lg:px-[8rem] h-auto">
      <div
        className="border-b-[1px] border-slate-300 h-auto py-3   bg-transparent w-full  text-3xl font-bold overflow-hidden"
        dangerouslySetInnerHTML={{ __html: blog.title }}
      />
      <div
        className="blog-container pt-6"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default page;
