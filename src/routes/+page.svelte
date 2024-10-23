<script lang="ts">
	import AnimatedSitename from '../components/HomePageAscii.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
	<section class="py-12 w-full">
		<div class="flex flex-col items-center justify-center gap-20 w-full">
			<AnimatedSitename />
			<div class="grid md:grid-cols-3 grid-cols-1 gap-10 w-full">
				<a href="/blog" class="card card1 text-[var(--base)] rounded-lg p-8 shadow-sm border-2 border-[var(--flamingo)]">
					<h2 class="text-2xl md:text-3xl font-bold text-[var(--flamingo)]">Blog</h2>
					<p class="text-[var(--subtext0)]">What I think</p>
				</a>
				<a href="/wip" class="card card2 text-[var(--base)] rounded-lg p-8 shadow-sm border-2 border-[var(--sky)]">
					<h2 class="text-2xl md:text-3xl font-bold text-[var(--sky)]">W.I.P</h2>
					<p class="text-[var(--subtext0)]">What I'm working on</p>
				</a>
				<a href="/projects" class="card card3 text-[var(--base)] rounded-lg p-8 shadow-sm border-2 border-[var(--green)]">
					<h2 class="text-2xl md:text-3xl font-bold text-[var(--green)]">Projects</h2>
					<p class="text-[var(--subtext0)]">What I've made</p>
				</a>
			</div>
		</div>
	</section>

	<section class="blog-preview my-12">
		<h2 class="text-2xl md:text-3xl font-bold text-[var(--flamingo)]">Something New I Just Learned Today!</h2>
		<p class="text-[var(--subtext0)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Sed sit amet accumsan arcu, in dignissim libero. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
	</section>

	<section class="wip-preview my-12">
		<h2 class="text-2xl md:text-3xl font-bold text-[var(--sky)]">A Cool Solution to Blogging</h2>
		<p class="text-[var(--subtext0)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Sed sit amet accumsan arcu, in dignissim libero. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
	</section>

	<section class="projects-preview my-12">
		<h2 class="text-2xl md:text-3xl font-bold text-[var(--green)]">Another</h2>
		<p class="text-[var(--subtext0)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Sed sit amet accumsan arcu, in dignissim libero. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
	</section>

<style>
	.card {
		transition: all 0.3s ease;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}

	.card1:before {
		background: radial-gradient(circle at 120% 80%, rgba(242, 205, 205, 0.2) 0%, rgba(242, 205, 205, 0) 70%);
	}

	.card2:before {
		background: radial-gradient(circle at 120% 80%, rgba(137, 220, 235, 0.2) 0%, rgba(137, 220, 235, 0) 70%);
	}

	.card3:before {
		background: radial-gradient(circle at 120% 80%, rgba(166, 227, 161, 0.2) 0%, rgba(166, 227, 161, 0) 70%);
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.card:hover::before {
		opacity: 1;
	}

	/* .card h2 {
		transition: transform 0.3s ease;
		position: relative;
	}

	.card:hover h2 {
		transform: scale(1.05) translateX(10px);
	} */

</style>
