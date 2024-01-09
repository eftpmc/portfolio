"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  repo: string;
  branch: string;
  contentPath: string;
}

export default function Blog({ params }: { params: { id: string } }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogConfig, setBlogConfig] = useState<BlogConfig | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    async function fetchBlogConfig() {
      const response = await fetch('/api/getBlogConfig');
      const configData = await response.json();
      const configForCurrentBlog = configData.blogs.find((config: BlogConfig) => config.id === id);
      setBlogConfig(configForCurrentBlog);
    }

    fetchBlogConfig();
  }, [id]);

  useEffect(() => {
    if (id && blogConfig) {
      const fetchBlogData = async function () {
        try {
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
          const postsData = await response.json();

          const commitsData = await fetchCommits(blogConfig, id);

          const combinedData = [...postsData, ...commitsData]
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

          setBlogPosts(combinedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      fetchBlogData();
    }
  }, [id, blogConfig]);


  if (blogPosts.length === 0) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:text-blue-800">
        &larr; Back
      </button>
      {blogPosts.map((item, index) => (
        <div key={index} className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <h3 className="text-xl font-bold mb-2">{new Date(item.date).toLocaleDateString()}</h3>
          {item.type === 'commit' ? (
            <div>
              <p>{item.description}</p>
              <a
              href={item.commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              View commit
            </a>
            </div>
          ) : (
            <div className="prose max-w-none overflow-x-auto" dangerouslySetInnerHTML={{ __html: item.content }} />
          )}
          {item.type === 'post' && (
            <a
              href={buildGithubEditUrl(item.blog, item.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Edit File
            </a>
          )}
        </div>
      ))}

    </div>
  );
}

const buildGithubEditUrl = (blogId: string, postId: string) => {
  const username = 'eftpmc';
  const repo = 'portfolio';
  const branch = 'main';
  const filePath = `blogs/${blogId}/${postId}.md`;

  return `https://github.com/${username}/${repo}/blob/${branch}/${filePath}`;
};

async function fetchCommits(blogConfig: BlogConfig, blogId: string) {
  const response = await fetch(`https://api.github.com/repos/${blogConfig.repo}/commits`);
  if (!response.ok) {
    throw new Error('Failed to fetch commits');
  }
  const commits = await response.json();
  return commits.map((commit: { sha: any; commit: { message: string; author: { date: any; }; }; }) => ({
    id: commit.sha,
    title: 'Commit: ' + commit.commit.message,
    date: commit.commit.author.date,
    content: '',
    type: 'commit',
    blog: blogId,
    commitUrl: `https://github.com/${blogConfig.repo}/commit/${commit.sha}`,
    description: commit.commit.message,
  }));
}

