"use client";
import { extractSubstringBetweenPTags } from "@/lib/helper";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  id?: string;
  title?: string;
  content?: string;
  author?: { name: string };
}

export function BlogCard({ id, title, content, author }: Props) {
  return (
    <div className="flex w-full max-w-2xl flex-col rounded-md border md:flex-row ">
      {/* Image div start optional */}
      {/* <div className="h-full w-full md:h-[200px] md:w-[300px]">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="Laptop"
          className="h-full w-full rounded-md object-cover"
        />
      </div> */}
      {/* <div> */}
      <div className="p-4 w-full">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {title && title}
        </h1>
        {content && (
          <section
            className="mt-3 text-sm text-gray-600"
            // dangerouslySetInnerHTML={{ __html: content }}
          >
            {extractSubstringBetweenPTags(content)?.slice(0, 200)}
          </section>
        )}
        {/* <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            #Macbook
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            #Apple
          </span>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            #Laptop
          </span>
        </div> */}
        <div className="mt-3 flex items-center justify-between space-x-2">
          <span className="flex flex-col">
            <span className="text-[10px] font-medium text-gray-900">
              @{author && author.name}
            </span>
            {/* <span className="text-[8px] font-medium text-gray-500">
              @dan_abromov
            </span> */}
          </span>

          {/* action item div */}
          <ul className="inline-flex gap-2 items-center">
            <li>save</li>
            <li>like</li>
          </ul>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
