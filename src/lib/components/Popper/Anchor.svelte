<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { Measurable, PopperStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  export let virtualElement: Measurable | undefined = undefined;

  if (!hasContext(CONTEXT.POPPER)) {
    throw new Error("Popper.Anchor must be used inside a Popper.Container");
  }

  const popperStore = getContext<Writable<PopperStoreType>>(CONTEXT.POPPER);

  $: {
    if ($popperStore.reference && !$popperStore.initialized) {
      setTimeout(() => {
        popperStore.update((state) => ({
          ...state,
          initialized: true,
        }));
      });
    }
  }
</script>

{#if $popperStore.reference}
  {#if virtualElement === undefined}
    <div
      class={$$props.class || ""}
      on:pointerenter
      on:pointerleave
      on:focus
      on:blur
      on:touchstart
      use:$popperStore.reference
    >
      <slot />
    </div>
  {:else}
    <slot />
    <div
      class="{$$props.class || ''} popper-virtual-element"
      style="
        position: fixed; 
        top: {virtualElement.getBoundingClientRect().y}px;
        left: {virtualElement.getBoundingClientRect().x}px;
        width: 0;
        height: 0;"
      on:pointerenter
      on:pointerleave
      on:focus
      on:blur
      on:touchstart
      use:$popperStore.reference
    />
  {/if}
{/if}
