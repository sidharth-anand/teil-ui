<script lang="ts">
	import { slide } from 'svelte/transition';

	import { assets } from '$app/paths';

	import Accordion from '$lib/components/Accordion';
	import Collapsible from '$lib/components/Collapsible';
	import Switch from '$lib/components/Switch';
	import Radio from '$lib/components/Radio';
	import Popper from '$lib/components/Popper';
	import Menu from '$lib/components/Menu';
	import ContextMenu from '$lib/components/ContextMenu';
	import Dialog from '$lib/components/Dialog';
	import DropdownMenu from '$lib/components/DropdownMenu';
	import HoverCard from '$lib/components/HoverCard';
	import Progress from '$lib/components/Progress';
	import Scroll from '$lib/components/Scroll';
	import Select from '$lib/components/Select';
	import Slider from '$lib/components/Slider';
	import Tabs from '$lib/components/Tabs';
	import Toggle from '$lib/components/Toggle';
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

	<Radio.Group class="radio__group">
		<Radio.Button class="radio__button" id="x" value="asd">
			<Radio.Indicator class="radio__indicator" />
		</Radio.Button>
		<Radio.Button class="radio__button" id="y" value="qwe">
			<Radio.Indicator class="radio__indicator" />
		</Radio.Button>
		<label>ASD</label>
		<label>QWE</label>
	</Radio.Group>

	<Accordion.Container class="accordion__container">
		<Accordion.Item class="accordion__item" value="item-1">
			<Accordion.Trigger class="accordion__trigger">Is it accessible?</Accordion.Trigger>
			<Accordion.Content class="accordion__content">
				<div class="accordion__content__text" transition:slide>
					Yes! You can animate the Accordion with CSS or JavaScript.
				</div></Accordion.Content
			>
		</Accordion.Item>

		<Accordion.Item class="accordion__item" value="item-2">
			<Accordion.Trigger class="accordion__trigger">Is it unstyled?</Accordion.Trigger>
			<Accordion.Content class="accordion__content">
				<div class="accordion__content__text" transition:slide>
					Yes! You can animate the Accordion with CSS or JavaScript.
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item class="accordion__item" value="item-3">
			<Accordion.Trigger class="accordion__trigger">Can it be animated?</Accordion.Trigger>
			<Accordion.Content class="accordion__content">
				<div class="accordion__content__text" transition:slide>
					Yes! You can animate the Accordion with CSS or JavaScript.
				</div>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Container>

	<Popper.Container>
		<Popper.Anchor class="popper__anchor">
			<button>Click me</button>
		</Popper.Anchor>
		<Popper.Content class="popper__content" side="right" alignment="center">
			<div>Popper content</div>
			<Popper.Arrow class="popper__arrow" height={20} width={40} />
		</Popper.Content>
	</Popper.Container>

	<Menu.Container>
		<Menu.Anchor class="menu__anchor"><button>ASD</button></Menu.Anchor>
		<Menu.Content class="menu__content">
			<Popper.Arrow class="popper__arrow" height={10} width={20} />
			<Menu.Group>
				<Menu.Item><a>Item 1</a></Menu.Item>
				<Menu.Item><a>Item 2</a></Menu.Item>
				<Menu.Item><a>Item 3</a></Menu.Item>
				<Menu.Sub>
					<a slot="item">Submenu Item -&lt;</a>
					<Menu.Content slot="menu">
						<Popper.Arrow class="popper__arrow" height={10} width={20} />
						<Menu.Group>
							<Menu.Item><a>Submenu Item 1</a></Menu.Item>
							<Menu.Item><a>Submenu Item 2</a></Menu.Item>
							<Menu.Item><a>Submenu Item 3</a></Menu.Item>
						</Menu.Group>
					</Menu.Content>
				</Menu.Sub>
				<Menu.ItemCheck>
					Check Item
					<Menu.ItemIndicator>
						<svelte:fragment slot="checked">+</svelte:fragment>
					</Menu.ItemIndicator>
				</Menu.ItemCheck>
			</Menu.Group>
			<Menu.Label>Radio Group</Menu.Label>
			<Menu.RadioGroup>
				<Menu.ItemRadio value="a"
					><Menu.ItemIndicator>
						<svelte:fragment slot="checked">+</svelte:fragment>
					</Menu.ItemIndicator> Option A</Menu.ItemRadio
				>
				<Menu.ItemRadio value="b"
					><Menu.ItemIndicator>
						<svelte:fragment slot="checked">+</svelte:fragment>
					</Menu.ItemIndicator> Option B</Menu.ItemRadio
				>
				<Menu.ItemRadio value="c"
					><Menu.ItemIndicator>
						<svelte:fragment slot="checked">+</svelte:fragment>
					</Menu.ItemIndicator> Option C</Menu.ItemRadio
				>
			</Menu.RadioGroup>
		</Menu.Content>
	</Menu.Container>

	<ContextMenu.Container>
		<ContextMenu.Trigger class="contextmenu__area">
			Right click for context menu
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item>
				<a>Item 1</a>
			</ContextMenu.Item>
			<ContextMenu.Item>
				<a>Item 2</a>
			</ContextMenu.Item>
			<ContextMenu.Item>
				<a>Item 3</a>
			</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Container>

	<HoverCard.Container>
		<HoverCard.Trigger>+</HoverCard.Trigger>
		<HoverCard.Content>Preview Content</HoverCard.Content>
	</HoverCard.Container>

	<Scroll.Area type="hover" class="scroll__area">
		<Scroll.Viewport class="scroll__viewport">
			<div>
				<div class="scroll__viewport-heading">Tags</div>
				{#each Array(100) as _, i}
					<div class="scroll__viewport-item">Item {i}</div>
				{/each}
			</div>
		</Scroll.Viewport>
		<Scroll.Bar class="scroll__bar">
			<Scroll.Thumb class="scroll__thumb" />
		</Scroll.Bar>
	</Scroll.Area>

	<ToggleGroup.Group class="toggle__group">
		<ToggleGroup.Button value="1" class="toggle">1</ToggleGroup.Button>
		<ToggleGroup.Button value="2" class="toggle">2</ToggleGroup.Button>
		<ToggleGroup.Button value="3" class="toggle">3</ToggleGroup.Button>
	</ToggleGroup.Group>

	<Select.Container>
		<Select.Trigger class="SelectTrigger" aria-label="Food">
			<Select.Value placeholder="Select a fruit…" />
			<Select.Icon class="SelectIcon">+</Select.Icon>
		</Select.Trigger>
		<Select.Content class="SelectContent">
			<Select.Up class="SelectScrollButton">+</Select.Up>
			<Select.Viewport class="SelectViewport">
				<Select.Group>
					<Select.Label class="SelectLabel">Fruits</Select.Label>

					<SelectItem value="apple">Apple</SelectItem>
					<SelectItem value="banana">Banana</SelectItem>
					<SelectItem value="blueberry">Blueberry</SelectItem>
					<SelectItem value="grapes">Grapes</SelectItem>
					<SelectItem value="pineapple">Pineapple</SelectItem>
				</Select.Group>

				<Select.Separator class="SelectSeparator" />

				<Select.Group>
					<Select.Label class="SelectLabel">Vegetables</Select.Label>
					<SelectItem value="aubergine">Aubergine</SelectItem>
					<SelectItem value="broccoli">Broccoli</SelectItem>
					<SelectItem value="carrot">Carrot</SelectItem>
					<SelectItem value="courgette">Courgette</SelectItem>
					<SelectItem value="leek">leek</SelectItem>
				</Select.Group>

				<Select.Separator class="SelectSeparator" />

				<Select.Group>
					<Select.Label class="SelectLabel">Meat</Select.Label>
					<SelectItem value="beef">Beef</SelectItem>
					<SelectItem value="chicken">Chicken</SelectItem>
					<SelectItem value="lamb">Lamb</SelectItem>
					<SelectItem value="pork">Pork</SelectItem>
				</Select.Group>
			</Select.Viewport>
			<Select.Down class="SelectScrollButton">+</Select.Down>
		</Select.Content>
	</Select.Container>

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

	.scroll__area {
		width: 200px;
		height: 225px;
		border-radius: 4px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.44);
		background-color: white;
		--scrollbar-size: 5px;
	}

	.scroll__viewport {
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}

	.scroll__bar {
		display: flex;
		user-select: none;
		touch-action: none;
		padding-top: 10px;
		padding-bottom: 5px;
		background: rgba(0, 0, 0, 0.44);
		transition: background 160ms ease-out;
	}
	.scroll__bar:hover {
		background: var(--blackA8);
	}
	.scroll__bar[data-orientation='vertical'] {
		width: var(--scrollbar-size);
	}
	.scroll__bar[data-orientation='horizontal'] {
		flex-direction: column;
		height: var(--scrollbar-size);
	}

	.scroll__thumb {
		flex: 1;
		background: mediumslateblue;
		border-radius: var(--scrollbar-size);
		position: relative;
	}
	/* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
	.scroll__thumb::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		min-width: 44px;
		min-height: 44px;
	}

	.scroll__viewport-heading {
		color: violet;
		font-size: 15px;
		line-height: 18px;
		font-weight: 500;
	}

	.scroll__viewport-item {
		color: mediumslateblue;
		font-size: 13px;
		line-height: 18px;
		margin-top: 10px;
		border-top: 1px solid pink;
		padding-top: 10px;
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
