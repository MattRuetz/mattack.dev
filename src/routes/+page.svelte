<script lang="ts">
	import AnimatedSitename from '../lib/components/HomePageAscii.svelte';
	import RouteCard from '../lib/components/RouteCard.svelte';
	import ArticlePreview from '../lib/components/ArticlePreview.svelte';
	import WIPPreview from '../lib/components/WIPPreview.svelte';
	import ProjectsPreview from '../lib/components/ProjectsPreview.svelte';
	import PreviewPlaceholder from '../lib/components/PreviewPlaceholder.svelte';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props<{ data: { latestArticle: { title: string, preview: string, path: string }, latestWIP: { title: string, preview: string, path: string }, latestProject: { title: string, preview: string, path: string } } }>();

	let fogOfWar = $state(true);

	onMount(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				fogOfWar = false;
			} else {
				fogOfWar = true;
			}
		}
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	})

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<section class="py-12 w-full mb-20">
	<div class="flex flex-col items-center justify-center gap-20 w-full">
		<AnimatedSitename />
		<div class="grid md:grid-cols-3 grid-cols-1 gap-10 w-full">
			<RouteCard heading="Blog" subheading="What I think" color="flamingo" icon="lightbulb" href="/blog" />
			<RouteCard heading="W.I.P." subheading="What I'm working on" color="sky" icon="spinner" href="/wip" />
			<RouteCard heading="Projects" subheading="What I've made" color="green" icon="code" href="/projects" />
		</div>
	</div>
</section>

<div class="max-w-[65ch] mx-auto">
	{#await data.latestArticle}
		<PreviewPlaceholder />
	{:then article}
		<ArticlePreview {article} />
	{/await}

	{#await data.latestWIP}
		<PreviewPlaceholder />
	{:then article}
		<WIPPreview {article} />
	{/await}

	{#await data.latestProject}
		<PreviewPlaceholder />
	{:then article}
		<ProjectsPreview {article} />
	{/await}
</div>

{#if fogOfWar}
	<div class="fog-of-war w-full h-[350px] fixed bottom-0 left-0 z-10 bg-gradient-to-t from-[var(--base)] to-transparent"
		transition:fade={{ duration: 500 }}
	></div>
{/if}
