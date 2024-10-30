import { GITHUB_TOKEN } from '$env/static/private';

// Add at the top of the file
export const config = {
    isr: {
        expiration: 60 // seconds
    }
};


async function fetchLatestFromFolder(folderPath: string) {
    const headers = {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'If-None-Match': '', // Force fresh content
        'Cache-Control': 'no-cache'
    };

    try {
        // Get contents of the folder
        const response = await fetch(`https://api.github.com/repos/MattRuetz/ObsidianVault/contents/${folderPath}`, { 
            headers 
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const files = await response.json();
        
        // Filter for markdown files
        const markdownFiles = files.filter((file: { name: string }) => 
            file.name.endsWith('.md')
        );

        // Get commit information for each file
        const filesWithDates = await Promise.all(
            markdownFiles.map(async (file: { path: string }) => {
                const commitsResponse = await fetch(
                    `https://api.github.com/repos/MattRuetz/ObsidianVault/commits?path=${file.path}&page=1&per_page=1`,
                    { headers }
                );
                const [lastCommit] = await commitsResponse.json();
                return {
                    ...file,
                    lastModified: new Date(lastCommit.commit.committer.date)
                };
            })
        );

        // Get the most recent file
        const latestFile = filesWithDates.sort((a, b) => 
            b.lastModified.getTime() - a.lastModified.getTime()
        )[0];
        
        // Fetch its content
        const contentResponse = await fetch(`https://raw.githubusercontent.com/MattRuetz/ObsidianVault/main/${latestFile.path}`, {
            headers
        });

        if (!contentResponse.ok) {
            throw new Error('Failed to fetch markdown content');
        }

        const content = await contentResponse.text();
        
        // Parse content
        const lines = content.split('\n');
        const title = lines[0].replace(/^#+\s*/, '');
        
        let preview = '';
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() && !lines[i].startsWith('#')) {
                preview = lines[i].trim();
                break;
            }
        }

        return {
            title,
            preview,
            path: `/${folderPath.split('/')[0].toLowerCase()}/${latestFile.path.replace('.md', '').replace(`${folderPath}/`, '')}`
        };
    } catch (error) {
        console.error(`Error loading from ${folderPath}:`, error);
        return {
            title: `Latest from ${folderPath}`,
            preview: 'Content temporarily unavailable',
            path: `/${folderPath.split('/')[0].toLowerCase()}`
        };
    }
}

async function fetchWithTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T): Promise<T> {
    try {
        const result = await Promise.race([
            promise,
            new Promise<T>((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), timeoutMs)
            )
        ]);
        return result;
    } catch (error) {
        console.warn('Fetch timeout, using fallback');
        return fallback;
    }
}

export const load = async () => {
    const defaultArticle = {
        title: 'Latest Article',
        preview: 'Loading latest content...',
        path: '/blog'
    };

    const defaultWIP = {
        title: 'Latest WIP',
        preview: 'Loading latest content...',
        path: '/wip'
    };

    const defaultProject = {
        title: 'Latest Project',
        preview: 'Loading latest content...',
        path: '/projects'
    };

    return {
        latestArticle: fetchWithTimeout(
            fetchLatestFromFolder('Blog Articles'),
            2000,
            defaultArticle
        ),
        latestWIP: fetchWithTimeout(
            fetchLatestFromFolder('WIP'),
            2000,
            defaultWIP
        ),
        latestProject: fetchWithTimeout(
            fetchLatestFromFolder('Past Projects'),
            2000,
            defaultProject
        )
    };
};
