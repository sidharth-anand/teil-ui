<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { SelectStoreType } from "./types";

  import { hasContext, getContext, onDestroy } from "svelte";

  import { CONTEXT } from "../../constants";

  import Scroll from "./Scroll.svelte";

  if (!hasContext(CONTEXT.SELECT)) {
    throw new Error("Select.Value must be used inside a Select.Container");
  }

  const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);

  let canScrollUp: boolean = false;

  function scroll() {
    canScrollUp = $selectStore.viewport.scrollTop > 0;
  }

  function autoscroll() {
    if ($selectStore.viewport && $selectStore.selected) {
      $selectStore.viewport.scrollTop -= $selectStore.selected.offsetHeight;
    }
  }

  onDestroy(() => {
    $selectStore.viewport.removeEventListener("scroll", scroll);
  });

  $: {
    if ($selectStore.viewport && $selectStore.positioned) {
      $selectStore.viewport.removeEventListener("scroll", scroll);
      $selectStore.viewport.addEventListener("scroll", scroll);
      scroll();
    }
  }
</script>

{#if canScrollUp}
  <Scroll class={$$props.class} on:autoscroll={autoscroll}>
    <slot />
  </Scroll>
{/if}
