<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { Measurable, PopperStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  export let virtualElement: Measurable | undefined = undefined;

  if (!hasContext(CONTEXT.POPPER)) {
    throw new Error("Popper.Anchor must be used inside a Popper.Container");
  }

  const popperStore = getContext<Writable<PopperStoreType>>(CONTEXT.POPPER);

  $: {
    if ($popperStore.reference) {
      setTimeout(() => {
        popperStore.update((state) => ({
          ...state,
          initialized: true,
        }));
      });
    }
  }
</script>

{#if $popperStore.reference}
  <div
    class="{$$props.class || ''} {virtualElement !== undefined
      ? 'popper-virtual-anchor'
      : ''}"
    use:$popperStore.reference
  >
    <slot />
  </div>
{/if}
