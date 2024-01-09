"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogPost {
  blog: string;
  id: string;
  title: string;
  date: string;
  content: string;
}

export default function Blog({ params }: { params: { id: string } }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const router = useRouter();
  const { id } = params;

  const buildGithubEditUrl = (blogId: string, postId: string) => {
    const username = 'eftpmc';
    const repo = 'portfolio';
    const branch = 'main';
    const filePath = `blogs/${blogId}/${postId}.md`;
  
    return `https://github.com/${username}/${repo}/blob/${branch}/${filePath}`;
  };  

  useEffect(() => {
    if (id) {
      const fetchBlogData = async function () {
        const response = await fetch('/api/getBlog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(id),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setBlogPosts(data); // Expecting data to be an array of posts
      }

      fetchBlogData();
    }
  }, [id]);

  if (blogPosts.length === 0) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:text-blue-800">
        &larr; Back
      </button>
      {blogPosts.map((post, index) => (
        <div key={index} className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <h3 className="text-xl font-bold mb-2">{post.date}</h3>
          <div className="prose max-w-none overflow-x-auto" dangerouslySetInnerHTML={{ __html: post.content }} />
          <a 
            href={buildGithubEditUrl(post.blog, post.id)}
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800"
          >
            Edit File
          </a>
        </div>
      ))}
    </div>
  );
}
