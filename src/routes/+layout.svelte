<!-- Start of Selection -->
<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';
	
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import '../app.css';

	let { data, children } = $props();
	let showHeader = $state(data.showHeader ?? true);
	let showFooter = $state(data.showFooter ?? true);

</script>

<div class="app">
	{#if showHeader}
		<Header />
	{/if}

	<main>
		{@render children()}
	</main>

	{#if showFooter}
		<Footer />
	{/if}
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		width: 95%;
		max-width: 1200px;
		margin: 0 auto;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
	}
</style>
