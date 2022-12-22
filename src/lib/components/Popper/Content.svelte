<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { ComputeConfig } from "svelte-floating-ui";

  import type {
    PopperStoreType,
    Side,
    Alignment,
    Boundary,
    Sticky,
  } from "./types";

  import { hasContext, getContext, setContext } from "svelte";
  import { writable } from "svelte/store";

  import { offset, shift, limitShift, hide, flip } from "@floating-ui/dom";
  import { createFloatingActions } from "svelte-floating-ui";

  import { CONTEXT } from "../../constants";

  export let side: Side = "bottom";
  export let alignment: Alignment = "center";

  export let sideOffset: number = 0;
  export let alignmentOffset: number = 0;

  export let boundaries: Boundary | Array<Boundary> = [];
  export let boundaryPadding: number | Partial<Record<Side, number>> = 0;

  export let sticky: Sticky = "partial";

  export let hideWhenDetached: boolean = false;
  export let avoidCollisions: boolean = true;

  const collisionPadding =
    typeof boundaryPadding === "number"
      ? boundaryPadding
      : { top: 0, right: 0, bottom: 0, left: 0, ...boundaryPadding };
  const boundary = boundaries instanceof Array ? boundaries : [boundaries];
  const hasExplicitBoundaries = boundary.length > 0;

  const overflowDetection = {
    padding: collisionPadding,
    boundary: boundary.filter((b) => b !== null),
    altBoundary: hasExplicitBoundaries,
  };

  if (!hasContext(CONTEXT.POPPER)) {
    throw new Error("Popper.Anchor must be used inside a Popper.Container");
  }

  const popperStore = getContext<Writable<PopperStoreType>>(CONTEXT.POPPER);
  const arrowStore = writable<HTMLElement>(null);

  const [floatingRef, floatingContent] = createFloatingActions();

  popperStore.update((state) => ({
    ...state,
    side,
    reference: floatingRef,
  }));

  setContext(CONTEXT.POPPERARROW, arrowStore);
</script>

{#if $popperStore.initialized}
  <div
    class="popper-content {$$props.class || ''}"
    use:floatingContent={{
      strategy: "fixed",
      //@ts-ignore
      placement: side + (alignment !== "center" ? "-" + alignment : ""),
      autoUpdate: true,
      middleware: [
        offset({
          mainAxis: sideOffset + ($arrowStore?.offsetHeight ?? 0),
          alignmentAxis: alignmentOffset,
        }),
        avoidCollisions
          ? shift({
              mainAxis: true,
              crossAxis: false,
              limiter: sticky === "partial" ? limitShift() : undefined,
              ...overflowDetection,
            })
          : undefined,
        avoidCollisions ? flip({ ...overflowDetection }) : undefined,
        hideWhenDetached ? hide({ strategy: "referenceHidden" }) : undefined,
      ].filter((m) => m !== undefined),
    }}
  >
    <slot />
  </div>
{/if}

<style>
  .popper-content {
    position: fixed;
    top: 0;
    left: 0;
    min-width: max-content;
  }
</style>
