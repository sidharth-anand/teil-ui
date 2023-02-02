<script>
	import Prism from 'prismjs';
	import 'prism-svelte';

	import Tabs from '$lib/components/Tabs';

	export let code = '';
	export let style = '';

	$: highlightedCode = Prism.highlight(code, Prism.languages.svelte, 'svelte');
	$: highlightedStyle = Prism.highlight(style, Prism.languages.css, 'css');
</script>

<div class="component">
	<slot name="component" />
</div>

<div class="component__code">
	<Tabs.Container value="code" class="docs-tabs__container">
		<Tabs.List class="docs-tabs__list">
			<Tabs.Trigger class="docs-tabs__trigger" value="code">Code</Tabs.Trigger>
			<Tabs.Trigger class="docs-tabs__trigger" value="style">Style</Tabs.Trigger>
			<Tabs.Trigger class="docs-tabs__trigger" value="skeleton">Skeleton</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="code" class="docs-tabs__content">
			<pre class="language-svelte">
				<code class="language-svelte">
{@html highlightedCode}
				</code>
			</pre>
		</Tabs.Content>
		<Tabs.Content value="style" class="docs-tabs__content">
			<pre class="language-css">
				<code class="language-css">
{@html highlightedStyle}
				</code>
			</pre>
		</Tabs.Content>
		<Tabs.Content value="skeleton" class="docs-tabs__content">
			<slot />
		</Tabs.Content>
	</Tabs.Container>
</div>

<slot name="content" />

<style>
	.component {
		width: 100%;
		background: #d8dee9;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 80px 10px;
		box-sizing: border-box;
	}

	.component__code {
		width: 100%;
		box-sizing: border-box;
	}

	:global(.docs-tabs__container),
	:global(.docs-tabs__content),
	:global(.docs-tabs__container pre) {
		width: 100%;
	}

	:global(.docs-tabs__list) {
		background: var(--sk-back-4);
		box-shadow: inset 0 -1px 0 0 #d8dee9;
	}

	:global(.docs-tabs__trigger) {
		padding: 7px 20px;
	}

	:global(.docs-tabs__trigger[aria-selected='true']) {
		outline: none;
		font-weight: bold;
		border-bottom: 2px solid #88c0d0;
	}

	:global(.docs-tabs__content) {
		min-height: 400px;
		height: 400px;
		overflow: auto;
	}

	:global(pre[class*='language-']::selection),
	:global(code[class*='language-']::selection),
	:global(pre[class*='language-']::mozselection),
	:global(code[class*='language-']::mozselection) {
		text-shadow: none;
		background: none;
	}

	:global(pre[class*='language-']),
	:global(code[class*='language-']) {
		color: #d8dee9;
		font-size: 1em;
		text-shadow: none;
		font-family: var(--font-mono);
		direction: ltr;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		line-height: 1.5;
		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;
		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;
	}

	:global(pre[class*='language-']::selection),
	:global(code[class*='language-']::selection),
	:global(pre[class*='language-']::mozselection),
	:global(code[class*='language-']::mozselection) {
		text-shadow: none;
		background: none;
	}
	@media print {
		:global(pre[class*='language-']),
		:global(code[class*='language-']) {
			text-shadow: none;
		}
	}
	:global(pre[class*='language-']) {
		padding: 1em;
		margin: 0;
		height: 100%;
		background: #2e3440;
	}
	:global(:not(pre) > code[class*='language-']) {
		padding: 0.1em;
		border-radius: 0.3em;
		color: #d8dee9;
		background: #2e3440;
	}
	/*********************************************************
* Tokens
*/
	:global(.namespace) {
		opacity: 0.7;
	}
	:global(.token.comment),
	:global(.token.prolog),
	:global(.token.doctype),
	:global(.token.cdata) {
		color: #606e87;
	}
	:global(.token.punctuation) {
		color: #81a1c1;
	}
	:global(.token.property),
	:global(.token.tag),
	:global(.token.boolean),
	:global(.token.number),
	:global(.token.constant),
	:global(.token.symbol),
	:global(.token.deleted) {
		color: #b48ead;
	}
	:global(.token.selector),
	:global(.token.attr-name),
	:global(.token.string),
	:global(.token.char),
	:global(.token.builtin),
	:global(.token.inserted) {
		color: #a2bf8c;
	}
	:global(.token.operator),
	:global(.token.entity),
	:global(.token.url),
	:global(.language-css .token.string),
	:global(.style .token.string) {
		color: #80a2c1;
		background: none;
	}
	:global(.token.atrule),
	:global(.token.attr-value),
	:global(.token.keyword) {
		color: #81a1c1;
	}
	:global(.token.function) {
		color: #8fbcbc;
	}
	:global(.token.regex),
	:global(.token.important),
	:global(.token.variable) {
		color: #ee9900;
	}
	:global(.token.important),
	:global(.token.bold) {
		font-weight: bold;
	}
	:global(.token.italic) {
		font-style: italic;
	}
	:global(.token.entity) {
		cursor: help;
	}
	/*********************************************************
		* Line highlighting
		*/
	:global(pre[data-line]) {
		position: relative;
	}
	:global(re[class*='language-'] > code[class*='language-']) {
		position: relative;
		z-index: -1;
	}
	:global(.line-highlight) {
		position: absolute;
		left: 0;
		right: 0;
		padding: inherit 0;
		margin-top: 1em;
		background: #3b4251;
		box-shadow: inset 5px 0 0 #d8dee9;
		z-index: 0;
		pointer-events: none;
		line-height: inherit;
		white-space: pre;
	}
</style>
