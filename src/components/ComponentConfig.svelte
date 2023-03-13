<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import ToggleGroup from '$lib/components/ToggleGroup';

	type ComponentOptionValue = string | boolean;
	type ComponentOptions = Record<string, ComponentOptionValue>;
	const options = getContext<Writable<ComponentOptions>>('component-options');

	export let variants: Record<string, ComponentOptionValue[]> = {};
	export let defaults: Record<string, number> = {};

	options.set(
		Object.fromEntries(
			Object.entries(defaults).map(([name, index]) => [name, variants?.[name]?.[index] || ''])
		)
	);
</script>

<div class="container">
	<h2>Options</h2>

	{#each Object.entries(variants) as [name, values]}
		<div class="config__item">
			<span class="variant-name">{name}</span>:
			<ToggleGroup.Group
				value={defaults[name]?.toString() || '0'}
				on:change={(e) => {
					const index = parseInt(e.detail);
					//@ts-ignore
					$options[name] = variants[name][index];
				}}
				class="config__group"
			>
				{#each values as value, i}
					<ToggleGroup.Button value={i.toString()} class="toggle">
						{value}
					</ToggleGroup.Button>
				{/each}
			</ToggleGroup.Group>
		</div>
	{/each}
</div>

<style global>
	:local(.container) {
		padding: 8px;
	}
	:local(.config__item) {
		padding-block: 4px;
	}
	:local(.variant-name) {
		font-weight: bold;
		font-size: 18px;
	}

	.config__group {
		display: inline-flex;
		border-radius: 4px;
		box-shadow: 0 2px 10px #2e344077;
	}
	.config__group > .toggle {
		box-shadow: none;
		border-radius: 0;
	}
	.config__group > .toggle:first-of-type {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	.config__group > .toggle:last-of-type {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	.toggle {
		background-color: #eceff4;
		color: #5e81ac;
		height: 32px;
		padding-inline: 8px;
		border-radius: 4px;
		display: flex;
		font-size: 14px;
		line-height: 1;
		align-items: center;
		justify-content: center;
	}
	.toggle:hover {
		background-color: #5e81ac;
		color: #eceff4;
	}
	.toggle[aria-pressed='true'],
	.toggle[aria-checked='true'] {
		background-color: #5e81ac;
		color: #eceff4;
	}
	.toggle:focus {
		box-shadow: 0 0 0 2px #2e344077;
	}
</style>
