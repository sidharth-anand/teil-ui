<script lang="ts">
	export let value: string = '';

	import Select from '$lib/components/Select';
</script>

<Select.Item {value} class="select__item">
	<Select.Indicator class="select__indicator">+</Select.Indicator>
	<Select.Text><slot /></Select.Text>
</Select.Item>

<style global>
	.select__item {
		font-size: 13px;
		line-height: 1;
		color: var(--tui-text-5);
		border-radius: 3px;
		display: flex;
		align-items: center;
		height: 25px;
		padding: 0 35px 0 25px;
		position: relative;
		user-select: none;
	}
	.select__item[data-disabled] {
		color: magenta;
		pointer-events: none;
	}
	.select__item[data-highlighted],
	.select__item:hover {
		outline: none;
		background-color: var(--tui-theme-4);
		color: var(--tui-text-5);
	}
	.select__indicator {
		position: absolute;
		left: 0;
		width: 25px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
