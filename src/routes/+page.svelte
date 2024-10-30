<script lang="ts">
	import AnimatedSitename from '../components/HomePageAscii.svelte';
	import RouteCard from '../components/RouteCard.svelte';
	let { data } = $props<{ data: { latestArticle: { title: string, preview: string, path: string } } }>();
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
			<RouteCard heading="W.I.P." subheading="What I'm working on" color="sky" icon="check" href="/wip" />
			<RouteCard heading="Projects" subheading="What I've made" color="green" icon="code" href="/projects" />
		</div>
	</div>
</section>

<section class="blog-preview my-12">
	<h2 class="text-2xl md:text-3xl font-bold text-[var(--flamingo)]">
		{data.latestArticle.title}
	</h2>
	<p class="text-[var(--subtext0)]">{data.latestArticle.preview}</p>
	<a href={data.latestArticle.path} class="text-[var(--flamingo)] hover:text-[var(--pink)]">Read more →</a>
</section>

<section class="wip-preview my-12">
	<h2 class="text-2xl md:text-3xl font-bold text-[var(--sky)]">A Cool Solution to Blogging</h2>
	<p class="text-[var(--subtext0)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Sed sit amet accumsan arcu, in dignissim libero. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
</section>

<section class="projects-preview my-12">
	<h2 class="text-2xl md:text-3xl font-bold text-[var(--green)]">Another</h2>
	<p class="text-[var(--subtext0)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Sed sit amet accumsan arcu, in dignissim libero. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
</section>

