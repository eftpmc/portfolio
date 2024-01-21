"use client";

import React, { useEffect, useState } from 'react';
import SectionTitle from "../Common/SectionTitle";
import SingleProject from "./SingleProject";
import { Loader2 } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  posts: { title: string; id: string; }[];
}

const Projects = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getBlogs');
      const data = await response.json();
      setBlogs(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
      <div className="container px-4">
        <div className="mb-[60px] text-center">
          <SectionTitle
            title="My Projects"
            paragraph="These are projects that I have put the most time into and best reflect my skills and expertise. Each project tackles a different challenge developmentally."
            width="640px"
            center
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            <span>Loading markdown...</span>
          </div>
        ) : (
          <div className="-mx-4 flex flex-wrap">
            {blogs.map(blog => (
              <div key={blog.id} className="w-full px-4 md:w-1/2 lg:w-1/3">
                <SingleProject blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
