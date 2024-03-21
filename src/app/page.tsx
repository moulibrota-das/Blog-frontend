import { BlogCard } from "@/components/ui/BlogCard";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/navbar";
import axios from "axios";
import Link from "next/link";

type Blog = {
  id: string;
  title: string;
  description: string;
  content: string;
  authorId: string;
};

const getBlogs = async () => {
  try {
    const response = await fetch("http://localhost:4000/blog/");
    const blogs = await response.json();
    if (blogs) {
      // setBlogs(response.data);
      return blogs;
    }
    console.log(blogs);
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  let blogs = await getBlogs();

  // getBlogs();

  return (
    <div className="bg-off-white dark:bg-slate-800 dark:text-off-white">
      <Navbar />
      <div className="mx-auto grid grid-cols-3 max-w-4xl  justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="container col-span-3 md:col-span-2 flex flex-col gap-4 py-2">
          {blogs &&
            blogs.map((blog: Blog) => {
              return (
                <Link key={blog.id} href={`/blog/${blog.id}`}>
                  <BlogCard
                    key={blog.id}
                    title={blog.title}
                    content={blog.content}
                    authorId={blog.authorId}
                    id={blog.id}
                  />
                </Link>
              );
            })}
        </div>
        <div className="container hidden py-2 top-0 col-span-1 md:block ">
          <BlogCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
