import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const blogsDirectory = path.join(process.cwd(), 'blogs');

export function getAllBlogIds() {
  const fileNames = fs.readdirSync(blogsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export async function getBlogData(id) {
  const fullPath = path.join(blogsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}
