import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { title } from 'process';

const blogsDirectory = path.join(process.cwd(), 'blogs');

export async function GET() {
    try {
        const directories = fs.readdirSync(blogsDirectory).filter(item => {
            const itemPath = path.join(blogsDirectory, item);
            return fs.statSync(itemPath).isDirectory();
        });

        const blogs = await Promise.all(directories.map(async (directory) => {
            const blogPath = path.join(blogsDirectory, directory);
            const blogFiles = fs.readdirSync(blogPath);

            const posts = await Promise.all(blogFiles.map(async (fileName) => {
                const filePath = path.join(blogPath, fileName);
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const { data } = matter(fileContents);
                return {
                    id: fileName.replace('.md', ''),
                    title: data.title || 'Untitled',
                    date: data.date || new Date().toISOString(),
                };
            }));

            posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            const formattedTitle = formatTitle(directory);

            return {
                id: directory,
                title: formattedTitle,
                posts,
            };
        }));

        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}

function formatTitle(title : string) {
    return title.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
}
