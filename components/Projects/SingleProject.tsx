"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  posts: { title: string; id: string; }[];
}

interface BlogPost {
  blog: string;
  id: string;
  title: string;
  date: string;
  content: string;
  type: string;
  commitUrl: string;
  description?: string;
}

interface BlogConfig {
  id: string;
  date: string;
  repo: string;
  repoUrl: string;
  branch: string;
  contentPath: string;
  description: string;
}

const SingleBlog = ({ blog }: { blog: Blog }) => {
  const [blogConfig, setBlogConfig] = useState<BlogConfig | null>(null);
  const router = useRouter();
  const id = blog.id;

  useEffect(() => {
    async function fetchBlogConfig() {
      const response = await fetch('/api/getBlogConfig');
      const configData = await response.json();
      const configForCurrentBlog = configData.blogs.find((config: BlogConfig) => config.id === id);
      setBlogConfig(configForCurrentBlog);
    }

    fetchBlogConfig();
  }, [id]);

  if (!blogConfig) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
        <span>Loading configuration...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow wow fadeInUp group mb-10" data-wow-delay=".1s">
      <div className='px-5 py-5'>
        <span className="mb-5 inline-block rounded bg-blue-500 px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
          {blogConfig.date}
        </span>
        <h3>
          <Link
            href={`/project/${id}`}
            className="mb-4 inline-block text-xl font-semibold text-black hover:text-blue-500 sm:text-2xl lg:text-xl xl:text-2xl"
          >
            {id}
          </Link>
        </h3>
        <p className="text-gray-500">{blogConfig.description}</p>
      </div>
    </div>
  );
};

export default SingleBlog;
