<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { ScrollStoreType, Orientation, Direction } from "../types";

  import { hasContext, getContext, onMount, onDestroy } from "svelte";

  import { CONTEXT } from "../../../constants";
  import { debounce } from "../../../debounce";
  import { StateMachine } from "../../../statemachine";
  import Visible from "./Visible.svelte";

  export let orientation: Orientation;

  if (!hasContext(CONTEXT.SCROLL)) {
    throw new Error("Scroll.Bar must be used inside a Scroll.Area");
  }

  const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);

  const scrollStateMachine = new StateMachine("hidden", {
    hidden: {
      SCROLL: "scrolling",
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting",
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle",
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting",
    },
  });
  const scrollState = scrollStateMachine.state;

  const debouncedScrollEnd = debounce(
    () => scrollStateMachine.step("SCROLL_END"),
    100
  );

  $: scrollDirection =
    orientation === "horizontal" ? "scrollLeft" : "scrollTop";

  let visible: boolean = false;
  let hideTimer: NodeJS.Timeout = null;
  let currentDirection: Direction = null;

  function pointerenter() {
    scrollStateMachine.step("POINTER_ENTER");
  }

  function pointerleave() {
    scrollStateMachine.step("POINTER_LEAVE");
  }

  function scroll() {
    if (currentDirection !== $scrollStore.viewport[scrollDirection]) {
      scrollStateMachine.step("SCROLL");
      debouncedScrollEnd();
    }

    currentDirection = $scrollStore.viewport[scrollDirection];
  }

  onMount(() => {
    $scrollStore.area.addEventListener("pointerenter", pointerenter);
    $scrollStore.area.addEventListener("pointerleave", pointerleave);

    $scrollStore.viewport.addEventListener("scroll", scroll);
  });

  onDestroy(() => {
    $scrollStore.area.removeEventListener("pointerenter", pointerenter);
    $scrollStore.area.removeEventListener("pointerleave", pointerleave);

    $scrollStore.viewport.removeEventListener("scroll", scroll);

    clearTimeout(hideTimer);
  });

  $: {
    if ($scrollStore.type === "scroll" && $scrollState === "idle") {
      hideTimer = setTimeout(
        () => scrollStateMachine.step("HIDE"),
        $scrollStore.delay
      );
    }
  }
</script>

{#if $scrollState !== "hidden"}
  <Visible class={$$props.class} {orientation}><slot /></Visible>
{/if}
