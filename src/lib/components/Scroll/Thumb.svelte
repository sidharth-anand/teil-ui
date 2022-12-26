<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { ScrollStoreType } from "./types";

  import { hasContext, getContext, onMount, onDestroy } from "svelte";

  import { CONTEXT } from "../../constants";
  import { debounce } from "../../debounce";

  if (!hasContext(CONTEXT.SCROLL)) {
    throw new Error("Scroll.Bar must be used inside a Scroll.Area");
  }

  const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);

  let removeUnlinkedScrollListener: () => void = null;
  const debouncedScrollEnd = debounce(() => {
    if (removeUnlinkedScrollListener) {
      removeUnlinkedScrollListener();
      removeUnlinkedScrollListener = null;
    }
  }, 100);

  function addUnlinkedScrollListener(node: HTMLElement, handler = () => {}) {
    let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
    let rAF = 0;

    (function loop() {
      const position = { left: node.scrollLeft, top: node.scrollTop };
      const isHorizontalScroll = prevPosition.left !== position.left;
      const isVerticalScroll = prevPosition.top !== position.top;
      if (isHorizontalScroll || isVerticalScroll) handler();
      prevPosition = position;
      rAF = window.requestAnimationFrame(loop);
    })();

    return () => window.cancelAnimationFrame(rAF);
  }

  function scroll() {
    debouncedScrollEnd();
    if (!removeUnlinkedScrollListener) {
      const listener = addUnlinkedScrollListener(
        $scrollStore.viewport,
        $scrollStore.thumbpositionchange
      );

      removeUnlinkedScrollListener = listener;
      $scrollStore.thumbpositionchange();
    }
  }

  function pointerdown(event: PointerEvent) {
    const thumb = event.target;
    //@ts-ignore
    const rect = thumb.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    $scrollStore.thumbpointerdown({ x, y });
  }

  onMount(() => {
    $scrollStore.viewport.addEventListener("scroll", scroll);

    $scrollStore.thumbpositionchange();
  });

  onDestroy(() => {
    $scrollStore.viewport.removeEventListener("scroll", scroll);
  });
</script>

<div
  bind:this={$scrollStore.thumb}
  class={$$props.class}
  style="
    width: var(--scroll-area-thumb-width); 
    height: var(--scroll-area-thumb-height);"
  on:pointerdown|capture={pointerdown}
  on:pointerup={$scrollStore.thumbpointerup}
>
  <slot />
</div>
