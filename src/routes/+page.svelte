<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Teil UI</title>
	<meta name="description" content="A high quality, comprehensive svelte headless low-level UI component library with an emphasis on accessibility, customisation, and developer experience." />
</svelte:head>

<main>
	<div>
		<h1>TeilUI is a better way <br /> to build design systems with svelte</h1>
		<h2>
			Unstyled, accessible, keyboard-navigable, headless components for building high-quality
			design systems and web apps in Svelte
		</h2>
		<a href="{base}/docs">Get Started &gt;</a>
	</div>
</main>

<style>
	main {
		background: radial-gradient(ellipse 80% 50% at 50% -20%, #88c0d044, rgba(0, 0, 0, 0));
		height: 100vh;
	}

	main > div {
		margin: auto;
		display: flex;
		width: 50%;
		justify-content: center;
		flex-direction: column;
		padding-top: 10%;
	}

	main > div > :where(h1, h2) {
		text-align: center;
	}

	main > div > h1 {
		text-align: center;
		margin: 24px 0px;
		background: linear-gradient(
			to right bottom,
			rgb(255, 255, 255) 30%,
			rgba(255, 255, 255, 0.38)
		);
		background-clip: padding-box text;
		box-decoration-break: clone;
		-webkit-background-clip: text;
		-webkit-box-decoration-break: clone;
		-webkit-text-fill-color: transparent;
		color: unset;
		padding-bottom: 0.13em;
		font-size: 80px;
		line-height: 1;
		letter-spacing: -0.02em;
		font-weight: 500;
	}

	main > div > h2 {
		color: rgb(180, 188, 208);
		text-align: center;
		margin: 0px 0px 48px;
		font-size: 22px;
		line-height: 1.3;
		font-weight: 400;
	}

	main > div > a {
		width: max-content;
		appearance: none;
		cursor: pointer;
		display: inline-flex;
		-moz-box-align: center;
		align-items: center;
		-moz-box-pack: center;
		justify-content: center;
		gap: 8px;
		flex-shrink: 0;
		margin: 0px;
		color: #2e3440;
		font-weight: 500;
		transition-property: border, background-color, color, box-shadow, opacity;
		font-size: 16px;
		height: 48px;
		border-radius: 9999px;
		padding: 0px 24px;
		border: medium none;
		background: #88c0d0;
		text-shadow: rgba(0, 0, 0, 0.25) 0px 3px 8px;
		margin: 0 auto;
	}

	main > div > a:hover {
		text-shadow: rgba(255, 255, 255, 0.56) 0px 3px 12px;
		box-shadow: #88c0d066 0px 1px 40px;
		text-decoration: none;
	}
</style>
