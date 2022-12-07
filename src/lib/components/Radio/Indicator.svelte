<script lang="ts">
  import { hasContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.RADIO)) {
    throw new Error("Radio.Indicator must be used inside Radio.Group");
  }
</script>

<span class={$$props.class}>
  <slot />
</span>
