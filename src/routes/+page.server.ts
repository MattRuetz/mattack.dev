import { promises as fs } from 'fs';
import { join } from 'path';

export const load = async () => {
    try {
        // Read the markdown file
        const articlePath = join(process.cwd(), 'src', 'lib', 'mock-articles', 'state-of-ai.md');
        const content = await fs.readFile(articlePath, 'utf-8');

        // Extract title and first paragraph for preview
        const lines = content.split('\n');
        const title = lines[0].replace(/^#+\s*/, ''); // Remove any heading markers
        
        // Find the first non-empty paragraph after the title
        let preview = '';
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() && !lines[i].startsWith('#')) {
                preview = lines[i].trim();
                break;
            }
        }

        return {
            latestArticle: {
                title,
                preview,
                path: '/blog/state-of-ai'
            }
        };
    } catch (error) {
        console.error('Error loading article:', error);
        return {
            latestArticle: {
                title: 'Error loading article',
                preview: 'Unable to load the latest article',
                path: '/blog'
            }
        };
    }
};
