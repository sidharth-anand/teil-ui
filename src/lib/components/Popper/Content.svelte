<script lang="ts">
  import type {
    PopperStoreType,
    Side,
    Alignment,
    Boundary,
    Sticky,
    Position,
  } from "./types";
  import type { Writable } from "svelte/store";

  import { hasContext, getContext } from "svelte";
  import { writable } from "svelte/store";

  import { offset, shift, limitShift, hide, flip } from "@floating-ui/dom";
  import { arrow, createFloatingActions } from "svelte-floating-ui";

  import { CONTEXT } from "../../constants";

  import { transformOrigin } from "./middleware";

  export let side: Side = "bottom";
  export let alignment: Alignment = "center";

  export let sideOffset: number = 0;
  export let alignmentOffset: number = 0;

  export let arrowPadding: number = 0;

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
    arrowStore,
    reference: floatingRef,
  }));
</script>

{#if $popperStore.initialized}
  <div
    class="popper-content {$$props.class || ''}"
    use:floatingContent={{
      strategy: "fixed",
      //@ts-ignore
      placement: side + (alignment !== "center" ? "-" + alignment : ""),
      middleware: [
        offset({
          mainAxis: sideOffset + $arrowStore?.offsetHeight ?? 0,
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
        arrow({ element: arrowStore, padding: arrowPadding }),
        avoidCollisions ? flip({ ...overflowDetection }) : undefined,
        transformOrigin({
          width: $arrowStore?.offsetWidth ?? 0,
          height: $arrowStore?.offsetHeight ?? 0,
        }),
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
