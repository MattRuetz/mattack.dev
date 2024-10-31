<script lang="ts">
    import ArticleLayout from '$lib/components/ArticleLayout.svelte';
    let { data } = $props();
</script>

<ArticleLayout {data} type="wip" />
