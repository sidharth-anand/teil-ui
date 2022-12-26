<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { ScrollStoreType } from "./types";

  import { hasContext, getContext, onMount, onDestroy } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.SCROLL)) {
    throw new Error("Scroll.Bar must be used inside a Scroll.Area");
  }

  const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);

  $: visible =
    $scrollStore.type !== "scroll" &&
    $scrollStore.vertical !== null &&
    $scrollStore.horizontal !== null &&
    $scrollStore.corner.width !== 0 &&
    $scrollStore.corner.height !== 0;

  const widthObserver = new ResizeObserver(() => {
    scrollStore.update((state) => ({
      ...state,
      corner: {
        ...state.corner,
        width: state.vertical?.offsetWidth ?? 0,
      },
    }));
  });

  const heightObserver = new ResizeObserver(() => {
    scrollStore.update((state) => ({
      ...state,
      corner: {
        ...state.corner,
        height: state.horizontal?.offsetHeight ?? 0,
      },
    }));
  });

  onMount(() => {
    widthObserver.observe($scrollStore.vertical);
    heightObserver.observe($scrollStore.horizontal);
  });

  onDestroy(() => {
    widthObserver.disconnect();
    heightObserver.disconnect();
  });
</script>

{#if visible}
  <div
    class={$$props.class}
    style="
        width: {$scrollStore.corner.width}px;
        height: {$scrollStore.corner.height}px;
        position: absolute;
        right: {$scrollStore.direction === 'ltr' ? 0 : undefined};
        left: {$scrollStore.direction === 'rtl' ? 0 : undefined};
        bottom: 0;
"
  >
    <slot />
  </div>
{/if}
