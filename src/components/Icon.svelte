<script lang="ts">
	export let name: string;
	export let size: number = 20;
</script>

<svg class="icon" width={size} height={size}>
	<use xlink:href="#{name}" />
</svg>

<style>
	.icon {
		position: relative;
		overflow: hidden;
		vertical-align: middle;
		-o-object-fit: contain;
		object-fit: contain;
		-webkit-transform-origin: center center;
		transform-origin: center center;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
</style>