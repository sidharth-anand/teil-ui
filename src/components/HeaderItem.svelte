<script lang="ts">
	export let href: string = '';
	export let external: string = '';
	export let title: string = '';
	export let selected: boolean = false;
</script>

{#if external}
	<li>
		<a href={external} {title} rel="external">
			<slot />
		</a>
	</li>
{:else}
	<li>
		<a aria-current={selected} {href} {title}>
			<slot />
		</a>
	</li>
{/if}

<style>
	a {
		font-size: var(--h5);
	}
	a:hover {
		color: var(--flash);
		opacity: 1;
	}
	[aria-current] {
		color: var(--prime);
	}
</style>
