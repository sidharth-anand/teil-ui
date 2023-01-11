<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { SelectStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  import { CONTENT_MARGIN } from "./constants";

  if (!hasContext(CONTEXT.SELECT)) {
    throw new Error("Select.Viewport must be used inside a Select.Container");
  }

  const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);

  let top: number = 0;

  function scroll(event: UIEvent) {
    const viewport = event.currentTarget as HTMLElement;
    const wrapper = $selectStore.wrapper;
    const expand = $selectStore.expandOnScroll;

    if (!expand || !wrapper) {
      return;
    }

    const scrolledBy = Math.abs(top - viewport.scrollTop);

    top = viewport.scrollTop;

    if (scrolledBy < 0) {
      return;
    }

    const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
    const cssMinHeight = parseFloat(wrapper.style.minHeight);
    const cssHeight = parseFloat(wrapper.style.height);
    const prevHeight = Math.max(cssMinHeight, cssHeight);

    if (availableHeight >= prevHeight) {
      return;
    }

    const nextHeight = prevHeight + scrolledBy;
    const clampedNextHeight = Math.min(availableHeight, nextHeight);
    const delta = nextHeight - clampedNextHeight;

    wrapper.style.height = `${clampedNextHeight}px`;
    if (wrapper.style.bottom === "0px") {
      viewport.scrollTop = Math.max(delta, 0);
      wrapper.style.justifyContent = "flex-end";
    }
  }
</script>

<div
  bind:this={$selectStore.viewport}
  role="presentation"
  class={$$props.class}
  style="
    position: relative;
    flex: 1;
    overflow: auto;
"
  on:scroll={scroll}
>
  <slot />
</div>

<style>
  div {
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
  }

  div::-webkit-scrollbar {
    display: none;
  }
</style>
