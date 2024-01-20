"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from "lucide-react";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

interface Blog {
  id: string;
  title: string;
  posts: { title: string; id: string; }[];
}

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getBlogs');
      const data = await response.json();
      setBlogs(data);
    }

    fetchData();
  }, []);

  return (
    <section className="dark:bg-dark bg-white pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Our Blogs"
            title="Our Recent News"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap">
          {blogs.length > 0 ? (
            blogs.map(blog => (
              <div key={blog.id} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <SingleBlog blog={blog} />
              </div>
            ))
          ) : (

            <div className="flex justify-center items-center text-center col-span-full">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              <span>Loading markdown...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;
