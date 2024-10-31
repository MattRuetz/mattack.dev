import { slugify } from '$lib/utils/slugify';
import { processMarkdown } from '$lib/utils/markdown';

export async function fetchArticle(folderPath: string, slug: string, githubToken: string) {
    const headers = {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'If-None-Match': '',
        'Cache-Control': 'no-cache'
    };

    try {
        const response = await fetch(`https://api.github.com/repos/MattRuetz/ObsidianVault/contents/${folderPath}`, { 
            headers 
        });

        if (!response.ok) {
            throw new Error('Article not found');
        }

        const files = await response.json();
        
        const currentFile = files.find((f: { name: string }) => 
            slugify(f.name.replace('.md', '')) === slug
        );

        if (!currentFile) {
            throw new Error('Article not found');
        }

        const otherArticles = files
            .filter((f: { name: string }) => f.name !== currentFile.name)
            .slice(0, 3)
            .map((f: { name: string }) => ({
                title: f.name.replace('.md', ''),
                slug: slugify(f.name.replace('.md', ''))
            }));

        const contentResponse = await fetch(
            `https://raw.githubusercontent.com/MattRuetz/ObsidianVault/main/${currentFile.path}`,
            { headers }
        );

        if (!contentResponse.ok) {
            throw new Error('Article not found');
        }

        const content = await contentResponse.text();
        const lines = content.split('\n');
        const title = lines[0].replace(/^#+\s*/, '');
        const body = lines.slice(1).join('\n').trim();

        return {
            title,
            content: await processMarkdown(body),
            slug,
            relatedArticles: otherArticles
        };
    } catch (err) {
        throw new Error('Article not found');
    }
}