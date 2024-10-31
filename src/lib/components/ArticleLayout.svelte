<script lang="ts">
    import ByLine from './ByLine.svelte';
    
    let { data, type } = $props<{ 
        data: { title: string; content: string; slug: string },
        type: 'blog' | 'project' | 'wip'
    }>();

    const typeColors = {
        blog: 'flamingo',
        project: 'green',
        wip: 'sky'
    };

    const typeLabels = {
        blog: 'Blog',
        project: 'Projects',
        wip: 'W.I.P'
    };

    const color = typeColors[type as keyof typeof typeColors];
    const label = typeLabels[type as keyof typeof typeLabels];
</script>

<svelte:head>
    <title>{data.title}</title>
    <meta name="description" content={data.title} />
</svelte:head>

<article class="blog-article prose prose-invert mx-auto py-8 max-w-[65ch]">
    <p class="uppercase pl-3 mb-10 bg-[var(--{color})] tracking-widest text-[var(--base)]">
        <a href="/{type}" class="breadcrumb flex items-center gap-2 no-underline text-[var(--base)] hover:text-[var(--base)] hover:opacity-100">
            <i class="fa-solid fa-arrow-left w-0 opacity-0"></i> {label} /
        </a>
    </p>
    <h1 class="mb-2">{data.title}</h1>
    <ByLine author="Matt Ruetz" />
    <div class="markdown-content">
        {@html data.content}
    </div>
</article>

<style>
    .breadcrumb .fa-arrow-left {
        transition: opacity 0.2s ease, width 0.2s ease;
    }
    .breadcrumb:hover .fa-arrow-left {
        opacity: 1;
        width: 1rem;
    }
</style>