<script lang="ts">
	import AnimatedSitename from '../components/HomePageAscii.svelte';
	import RouteCard from '../components/RouteCard.svelte';
	import ArticlePreview from '../components/ArticlePreview.svelte';
	import WIPPreview from '../components/WIPPreview.svelte';
	import ProjectsPreview from '../components/ProjectsPreview.svelte';
	import PreviewPlaceholder from '../components/PreviewPlaceholder.svelte';
	let { data } = $props<{ data: { latestArticle: { title: string, preview: string, path: string }, latestWIP: { title: string, preview: string, path: string }, latestProject: { title: string, preview: string, path: string } } }>();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<section class="py-12 w-full">
	<div class="flex flex-col items-center justify-center gap-20 w-full">
		<AnimatedSitename />
		<div class="grid md:grid-cols-3 grid-cols-1 gap-10 w-full">
			<RouteCard heading="Blog" subheading="What I think" color="flamingo" icon="lightbulb" href="/blog" />
			<RouteCard heading="W.I.P." subheading="What I'm working on" color="sky" icon="spinner" href="/wip" />
			<RouteCard heading="Projects" subheading="What I've made" color="green" icon="code" href="/projects" />
		</div>
	</div>
</section>

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

