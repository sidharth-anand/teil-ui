<script lang="ts">
	function mousedown(event: MouseEvent) {
		if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
	}
</script>

<label {...$$restProps} on:mousedown on:mousedown={mousedown}><slot /></label>
