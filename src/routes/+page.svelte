<script lang="ts">
	import { assets } from '$app/paths';

	import Popper from '$lib/components/Popper';
	import ToggleGroup from '$lib/components/ToggleGroup';
</script>

<main>
	<div>
		<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
			<img src="{assets}/vite.svg" class="logo" alt="Vite Logo" />
		</a>
		<a href="https://svelte.dev" target="_blank" rel="noreferrer">
			<img src="{assets}/svelte.svg" class="logo svelte" alt="Svelte Logo" />
		</a>
	</div>
	<h1>Vite + Svelte</h1>

	<div class="card">
	</div>

	<Popper.Container>
		<Popper.Anchor class="popper__anchor">
			<button>Click me</button>
		</Popper.Anchor>
		<Popper.Content class="popper__content" side="right" alignment="center">
			<div>Popper content</div>
			<Popper.Arrow class="popper__arrow" height={20} width={40} />
		</Popper.Content>
	</Popper.Container>

	<p>
		Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer"
			>SvelteKit</a
		>, the official Svelte app framework powered by Vite!
	</p>

	<p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style global>
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
	.read-the-docs {
		color: #888;
	}
	:global(.radio__button .radio__indicator) {
		width: 10px;
		height: 10px;
		display: inline-block;
		background: white;
	}
	:global(.radio__button[checked='true'] .radio__indicator) {
		background: green;
	}
	.popper__anchor button {
		width: 100%;
	}
	.popper__arrow {
		fill: green;
	}
	.menu__anchor {
		margin-bottom: 200px;
	}
</style>
