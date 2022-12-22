<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { PopperStoreType, Side } from "./types";

  import { hasContext, getContext, onMount } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.POPPER)) {
    throw new Error("Popper.Anchor must be used inside a Popper.Container");
  }

  const TransformOrigins: Record<Side, String> = {
    top: "",
    right: "0 0",
    bottom: "center 0",
    left: "100% 0",
  };

  const Opposites: Record<Side, Side> = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  };

  const Adjacents: Record<Side, Side> = {
    top: "left",
    bottom: "left",
    left: "top",
    right: "top",
  };

  const Transforms: Record<Side, String> = {
    top: "translateY(100%)",
    right: "translateY(50%) rotate(90deg) translateX(-50%)",
    bottom: `rotate(180deg)`,
    left: "translateY(50%) rotate(-90deg) translateX(50%)",
  };

  export let width: number = 10;
  export let height: number = 5;

  function getAdjacentDimension(side: Side): number {
    if (side === "top" || side === "bottom") {
      return width;
    } else {
      return height;
    }
  }

  const popperStore = getContext<Writable<PopperStoreType>>(CONTEXT.POPPER);
  const arrowStore = getContext<Writable<HTMLElement>>(CONTEXT.POPPERARROW);
</script>

<span
  bind:this={$arrowStore}
  style="{Opposites[$popperStore.side]}: 0; {Adjacents[
    $popperStore.side
  ]}: calc(50% - {getAdjacentDimension($popperStore.side) /
    2}px); transform-origin: {TransformOrigins[
    $popperStore.side
  ]}; transform: {Transforms[$popperStore.side]}"
  ><svg
    class={$$props.class}
    {width}
    {height}
    viewBox="0 0 30 10"
    preserveAspectRatio="none"
  >
    <polygon points="0,0 15,10 30,0" />
  </svg></span
>

<style>
  span {
    position: absolute;
  }

  svg {
    display: block;
  }
</style>
