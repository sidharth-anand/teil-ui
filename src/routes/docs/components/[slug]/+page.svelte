<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>TeilUI - {data.meta.title}</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content="Teil UI - {data.meta.title}" />
	<meta property="og:description" content={data.meta.description} />
	<meta name="twitter:title" content="Teil UI - {data.meta.title}" />
	<meta name="twitter:description" content={data.meta.description} />
</svelte:head>

<div class="container">
	<div class="title">
		<h1>{data.meta.title}</h1>
		<h5>{data.meta.description}</h5>
	</div>

	<div class="component">
		<svelte:component this={data.content} code={data.code} style={data.style} />
	</div>

	<div class="reference">
		<h2>API Reference</h2>

		{#each Array.from(data.components?.entries() ?? []).filter(([component, _]) => !data.meta.exclude?.includes(component)) as [component, info]}
			<div class="reference__component">
				<h3>{component}</h3>
				{#if info.props.length > 0}
					<table>
						<thead>
							<tr>
								<th class="prop">Prop</th>
								<th class="type">Type</th>
								<th class="default">Default</th>
							</tr>
						</thead>
						<tbody>
							{#each info.props as prop}
								<tr>
									<td class="prop">
										<code>{prop.name}</code>
									</td>
									<td class="type">
										<code>{prop.type}</code>
									</td>
									<td
										class="default"
										class:empty={prop.defaultValue === undefined}
									>
										<code>{prop.defaultValue ?? '-'}</code>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{:else}
					<small>No props</small>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		padding-left: 250px;
	}

	.title h1 {
		color: var(--tui-text-5);
	}

	.title h5 {
		color: #b1b1b1;
	}

	.component {
		--component-width: 100px;
		margin-left: calc(-1 * var(--component-width));
		width: calc(100% + 2 * var(--component-width));
		margin-top: 50px;
	}

	@media (max-width: 1200px) {
		.container {
			padding-left: 0;
		}

		.component {
			--component-width: var(--tui-page-padding-side);
		}
	}

	.reference {
		margin-top: 50px;
	}

	.reference__component {
		margin-top: 30px;
	}

	.reference__component > table {
		margin-top: 5px;
		width: 100%;
		border-collapse: collapse;
	}

	.reference__component > table tr {
		border-bottom: 1px solid #eee;
	}

	.reference__component > table td {
		margin: 0;
		border: none;
		padding: 10px 0;
	}

	.reference__component > table th {
		font-size: 1em;
		font-weight: 300;
	}

	.reference__component > table th.prop,
	.reference__component > table td.prop {
		width: 50%;
	}

	.reference__component > table td.prop > code {
		background: var(--tui-theme-4);
		border-radius: 2px;
		padding: 3px;
		color: var(--tui-text-5);
		font-weight: bold;
	}

	.reference__component > table td.type > code,
	.reference__component > table td.default:not(.empty) > code {
		background: #4c566a;
		color: var(--tui-text-5);
		border-radius: 2px;
	}

	.reference__component > table td.default.empty > code {
		background: transparent;
		font-size: 2em;
		color: #b1b1b1;
	}
</style>
