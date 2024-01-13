"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
  repoUrl: string;
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
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

          setBlogPosts(combinedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      fetchBlogData();
    }
  }, [id, blogConfig]);


  if (blogPosts.length === 0) return <div className="w-screen h-screen mx-auto p-4">
    <div>Loading...</div>
  </div>;

  if (!blogConfig) {
    return <div className="w-screen h-screen mx-auto p-4">Loading configuration...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 text-white-500 hover:text-blue-500">
        &larr; Back
      </button>
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
          {id}
        </h1>
      </div>
      <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
          <Link target="_blank" key="github" href={blogConfig.repoUrl}>
            github <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
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
  let allCommits: any[] = [];
  let page = 1;
  const perPage = 25; // Number of commits per page
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`https://api.github.com/repos/${blogConfig.repo}/commits?page=${page}&per_page=${perPage}`);
    if (!response.ok) {
      throw new Error('Failed to fetch commits');
    }
    const commits = await response.json();

    if (commits.length === 0 || commits.length < perPage) {
      hasMore = false; // No more commits to fetch
    } else {
      page++; // Increment page number for next iteration
    }

    allCommits = allCommits.concat(commits.map((commit: { commit: { message: any; author: { date: any; }; }; sha: any; }) => {
      const commitMessage = commit.commit.message;
      const firstNewLineIndex = commitMessage.indexOf('\n');
      const title = firstNewLineIndex === -1 ? commitMessage : commitMessage.substring(0, firstNewLineIndex).trim();
      const description = firstNewLineIndex === -1 ? '' : commitMessage.substring(firstNewLineIndex + 1).trim();

      return {
        id: commit.sha,
        title: title,
        date: commit.commit.author.date,
        content: '',
        type: 'commit',
        blog: blogId,
        commitUrl: `https://github.com/${blogConfig.repo}/commit/${commit.sha}`,
        description: description,
      };
    }));
  }

  return allCommits;
}


