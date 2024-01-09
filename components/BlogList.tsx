"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <Link href={`/blog/${blog.id}`} key={blog.id} passHref>
                        <div className="block border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer">
                            <h2 className="text-xl font-semibold">{blog.title}</h2>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No blogs available.</p>
            )}
        </div>
    );
};



export default BlogList;


