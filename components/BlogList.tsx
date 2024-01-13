"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2 } from "lucide-react";

interface Blog {
    id: string;
    title: string;
    posts: { title: string; id: string; }[];
}

const BlogList = () => {
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
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center my-10">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <Link href={`/blog/${blog.id}`} key={blog.id} passHref>
                            <div className="block border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer">
                                <h2 className="text-xl font-semibold text-center">{blog.title}</h2>
                            </div>
                        </Link>
                    ))
                ) : (

                    <div className="flex justify-center items-center text-center col-span-full">
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        <span>Loading markdown...</span>
                    </div>
                )}
            </div>
        </div>
    );
};



export default BlogList;


