<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { ScrollStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.SCROLL)) {
    throw new Error("Scroll.Viewport must be used inside a Scroll.Area");
  }

  const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);
</script>

<div
  bind:this={$scrollStore.viewport}
  class="scroll-viewport {$$props.class}"
  style="
    overflow-x: {$scrollStore.enableX ? 'scroll' : 'hidden'};
    overflow-y: {$scrollStore.enableY ? 'scroll' : 'hidden'};"
>
  <div bind:this={$scrollStore.content}>
    <slot />
  </div>
</div>

<style>
  .scroll-viewport {
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
  }

  .scroll-viewport::-webkit-scrollbar {
    display: none;
  }

  .scroll-viewport > div {
    min-width: 100%;
    display: table;
  }
</style>
