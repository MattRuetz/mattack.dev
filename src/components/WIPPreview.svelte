<script lang="ts">
	let { article } = $props<{ article: { title: string, preview: string, path: string } }>();
</script>

<section class="blog-preview my-12">
    <h2 class="text-2xl md:text-3xl font-bold text-[var(--sky)]">
        {article.title}
    </h2>
    <p class="text-[var(--subtext0)]">{article.preview}</p>
	<a href={article.path} class="text-[var(--sky)] hover:text-[var(--pink)]">Read more →</a>
</section>