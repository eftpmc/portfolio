import fs from 'fs';
import path from 'path';

const configFilePath = path.join(process.cwd(), 'blogConfig.json');

export async function GET() {
    try {
        if (!fs.existsSync(configFilePath)) {
            return new Response(JSON.stringify({ message: 'Config file not found' }), { status: 404 });
        }

        const fileContents = fs.readFileSync(configFilePath, 'utf8');
        const blogConfig = JSON.parse(fileContents);

        return new Response(JSON.stringify(blogConfig), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
