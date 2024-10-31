import { GITHUB_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { fetchArticle } from '$lib/utils/fetchArticle';

export async function load({ params }) {
    try {
        return await fetchArticle('WIP', params.article, GITHUB_TOKEN);
    } catch (err) {
        throw error(404, 'Article not found');
    }
}