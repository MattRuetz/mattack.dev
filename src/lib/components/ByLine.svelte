<script lang="ts">
	let { author } = $props<{ author: string }>();
</script>

<p class="flex items-center gap-2 text-sm text-[var(--lavender)]">
	<img 
		src="/favicon.png" 
		alt={`${author}'s profile picture`}
		class="w-8 h-8 rounded-full my-0"
	/>
	By {author}
</p>
