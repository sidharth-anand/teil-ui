<script lang="ts">
	import { assets } from '$app/paths';

	import Switch from '$lib/components/Switch';
	import Popper from '$lib/components/Popper';
	import Scroll from '$lib/components/Scroll';
	import Select from '$lib/components/Select';
	import Tabs from '$lib/components/Tabs';
	import ToggleGroup from '$lib/components/ToggleGroup';

	import SelectItem from '../components/SelectItem.svelte';
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
		<Switch.Track class="switch__track">
			<Switch.Thumb class="switch__thumb" />
		</Switch.Track>
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

	<ToggleGroup.Group class="toggle__group">
		<ToggleGroup.Button value="1" class="toggle">1</ToggleGroup.Button>
		<ToggleGroup.Button value="2" class="toggle">2</ToggleGroup.Button>
		<ToggleGroup.Button value="3" class="toggle">3</ToggleGroup.Button>
	</ToggleGroup.Group>

	<Tabs.Container class="tabs__container" value="1">
		<Tabs.List class="tabs__list">
			<Tabs.Trigger value="1" class="tabs__trigger">Account</Tabs.Trigger>
			<Tabs.Trigger value="2" class="tabs__trigger">Password</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="1" class="tabs__content">Tab 1</Tabs.Content>
		<Tabs.Content value="2" class="tabs__content">Tab 2</Tabs.Content>
	</Tabs.Container>

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
	:global(.switch__track) {
		width: 40px;
		height: 20px;
		border-radius: 15px;
		background-color: #ccc;
		display: flex;
		align-items: center;
		padding: 0;
	}
	:global(.switch__thumb) {
		background: red;
		width: 20px;
		height: 20px;
		border-radius: 15px;
		display: block;
	}
	:global(.switch__track[checked='true'] .switch__thumb) {
		background: green;
		transform: translateX(20px);
		transform-origin: center;
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

	.toggle__group {
		display: inline-flex;
		background-color: magenta;
		border-radius: 4px;
		box-shadow: 0 2px 10px black;
	}
	.toggle__group > .toggle {
		box-shadow: none;
		border-radius: 0;
	}
	.toggle__group > .toggle:first-of-type {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	.toggle__group > .toggle:last-of-type {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.SelectTrigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		padding: 0 15px;
		font-size: 13px;
		line-height: 1;
		height: 35px;
		gap: 5px;
		background-color: white;
		color: violet;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
	}
	.SelectTrigger:hover {
		background-color: magenta;
	}
	.SelectTrigger:focus {
		box-shadow: 0 0 0 2px black;
	}
	.SelectTrigger[data-placeholder] {
		color: violet;
	}

	.SelectIcon {
		color: violet;
	}

	.SelectContent {
		overflow: hidden;
		background-color: white;
		border-radius: 6px;
		box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
			0px 10px 20px -15px rgba(22, 23, 24, 0.2);
	}

	.SelectViewport {
		padding: 5px;
	}

	.SelectItem {
		font-size: 13px;
		line-height: 1;
		color: violet;
		border-radius: 3px;
		display: flex;
		align-items: center;
		height: 25px;
		padding: 0 35px 0 25px;
		position: relative;
		user-select: none;
	}
	.SelectItem[data-disabled] {
		color: magenta;
		pointer-events: none;
	}
	.SelectItem[data-highlighted] {
		outline: none;
		background-color: var(--violet9);
		color: var(--violet1);
	}

	.SelectLabel {
		padding: 0 25px;
		font-size: 12px;
		line-height: 25px;
		color: magenta;
	}

	.SelectSeparator {
		height: 1px;
		background-color: magenta;
		margin: 5px;
	}

	.SelectItemIndicator {
		position: absolute;
		left: 0;
		width: 25px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.SelectScrollButton {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 25px;
		background-color: white;
		color: violet;
		cursor: default;
	}

	.tabs__container {
		display: flex;
		flex-direction: column;
		width: 300px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.44);
	}

	.tabs__list {
		flex-shrink: 0;
		display: flex;
		border-bottom: 1px solid black;
	}

	.tabs__trigger {
		font-family: inherit;
		background-color: white;
		padding: 0 20px;
		height: 45px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		line-height: 1;
		color: magenta;
		user-select: none;
		border-radius: 0;
	}

	.tabs__trigger:first-child {
		border-top-left-radius: 6px;
	}
	.tabs__trigger:last-child {
		border-top-right-radius: 6px;
	}
	.tabs__trigger:hover {
		color: violet;
	}
	.tabs__trigger[aria-expanded='true'] {
		color: violet;
		box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor;
	}
	.tabs__trigger:focus {
		position: relative;
		box-shadow: 0 0 0 2px black;
	}
	.tabs__content {
		flex-grow: 1;
		padding: 20px;
		background-color: white;
		color: black;
		border-bottom-left-radius: 6px;
		border-bottom-right-radius: 6px;
		outline: none;
	}
	.tabs__content:focus {
		box-shadow: 0 0 0 2px black;
	}
</style>
