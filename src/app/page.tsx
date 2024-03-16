"use client"
import { BlogCard } from "@/components/ui/BlogCard";
import { Footer } from "@/components/ui/Footer";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type Blog = {
  id:string,
  title : string,
  description : string,
  content : string,
  authorId : string
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const getBlogs = async ()=>{
    try {
      const response = await axios.get("http://localhost:4000/blog/")
      if(response){
        setBlogs(response.data);
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    getBlogs();
  }, [])
  

  return (
    <div className="bg-off-white"> 
      <Navbar/>
      <div className="mx-auto grid grid-cols-3 max-w-7xl  justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="container col-span-3 md:col-span-2 flex flex-col gap-4 py-2">
          {blogs && blogs.map((blog:Blog)=>{
            return (<BlogCard key={blog.id} title={blog.title} content={blog.content} authorId={blog.authorId}/>)
          })}
        </div>
        <div className="container hidden top-0 col-span-1 md:block ">
        <BlogCard/>
        </div>
      

      </div>
      <Footer/>
    </div>
  );
}
