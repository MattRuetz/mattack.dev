<!-- Start of Selection -->
<script lang="ts">
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import '../app.css';

	let props = $props();
	console.log('Layout props:', props);

	let { data, children } = props;

	console.log('Layout data:', data);

	let showHeader = $state(data.showHeader ?? true);
	let showFooter = $state(data.showFooter ?? true);
	console.log('Derived showHeader:', showHeader);
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
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		box-sizing: border-box;
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
