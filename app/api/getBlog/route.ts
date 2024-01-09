import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const blogsDirectory = path.join(process.cwd(), 'blogs');

export async function POST(req: Request) {
    const id = await req.json();

    try {
        if (id && typeof id === 'string') {
            const blogPath = path.join(blogsDirectory, id);
            if (!fs.existsSync(blogPath) || !fs.lstatSync(blogPath).isDirectory()) {
                return new Response(JSON.stringify({ message: 'Blog not found' }), { status: 404 });
            }

            const fileNames = fs.readdirSync(blogPath);
            const blogPosts = await Promise.all(fileNames.map(async (fileName) => {
                const filePath = path.join(blogPath, fileName);

                // Check if the path is a file, not a directory
                if (fs.lstatSync(filePath).isFile()) {
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data, content } = matter(fileContents);

                    const processedContent = await remark()
                        .use(html)
                        .process(content);
                    const contentHtml = processedContent.toString();

                    return { id: fileName.replace('.md', ''), ...data, content: contentHtml };
                }
            }));

            // Filter out any undefined entries (in case of directories)
            return new Response(JSON.stringify(blogPosts.filter(Boolean)), { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
