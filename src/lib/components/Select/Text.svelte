<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { SelectStoreType, SelectItemStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.SELECT)) {
    throw new Error("Select.Text must be used inside a Select.Container");
  }

  if (!hasContext(CONTEXT.SELECTITEM)) {
    throw new Error("Select.Text must be used inside a Select.Item");
  }

  const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);
  const selectItemStore = getContext<Writable<SelectItemStoreType>>(
    CONTEXT.SELECTITEM
  );

  let element: HTMLElement | null = null;

  $: {
    if (
      $selectItemStore.selected &&
      element !== null &&
      $selectStore.text !== element
    ) {
      selectStore.update((state) => ({
        ...state,
        text: element,
        valuetext: element.textContent,
      }));
    }
  }

  //TODO: Native form control for option
</script>

<span bind:this={element} id={$selectItemStore.id} class={$$props.class}>
  <slot />
</span>
