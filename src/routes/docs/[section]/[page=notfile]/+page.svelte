<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Teil UI - {data.page.title}</title>
	<meta name="description" content="A high quality, comprehensive svelte headless low-level UI component library with an emphasis on accessibility, customisation, and developer experience.">
</svelte:head>

<svelte:component this={data.component} />
