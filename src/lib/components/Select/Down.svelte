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

  let canScrollDown: boolean = false;

  function scroll() {
    canScrollDown =
      Math.ceil($selectStore.viewport.scrollTop) <
      $selectStore.viewport.scrollHeight - $selectStore.viewport.clientHeight;
  }

  function autoscroll() {
    if ($selectStore.viewport && $selectStore.selected) {
      console.log("scrolling", $selectStore.viewport.scrollTop);
      $selectStore.viewport.scrollTop += $selectStore.selected.offsetHeight;
      console.log("scrolling", $selectStore.viewport.scrollTop);
    }
  }

  onDestroy(() => {
    $selectStore.viewport.removeEventListener("scroll", scroll);
  });

  $: {
    if ($selectStore.viewport) {
      $selectStore.viewport.addEventListener("scroll", scroll);
    }
  }

  $: {
    if ($selectStore.viewport && $selectStore.positioned) {
      scroll();
    }
  }
</script>

{#if canScrollDown}
  <Scroll class={$$props.class} on:autoscroll={autoscroll}>
    <slot />
  </Scroll>
{/if}
