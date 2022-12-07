<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { AccordionStoreType, AccordionItemStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.ACCORDION_ITEM)) {
    throw new Error("Accordion.Trigger must be used inside Accordion.Item");
  }

  const accordionStore = getContext<Writable<AccordionStoreType>>(
    CONTEXT.ACCORDION
  );
  const accordionItemStore = getContext<Writable<AccordionItemStoreType>>(
    CONTEXT.ACCORDION_ITEM
  );

  function toggle() {
    if ($accordionItemStore.disabled) {
      return;
    }

    if ($accordionItemStore.open) {
      const index = $accordionStore.open.indexOf($accordionItemStore.value);
      accordionStore.update((state) => ({
        ...state,
        open: [...state.open.slice(0, index), ...state.open.slice(index + 1)],
      }));
    } else {
      if ($accordionStore.type === "single") {
        accordionStore.update((state) => ({
          ...state,
          open: [$accordionItemStore.value],
        }));
      } else {
        accordionStore.update((state) => ({
          ...state,
          open: [...state.open, $accordionItemStore.value],
        }));
      }
    }
  }
</script>

<button
  class={$$props.class}
  type="button"
  aria-controls={$accordionItemStore.id}
  aria-expanded={$accordionItemStore.open}
  aria-disabled={$accordionItemStore.disabled}
  disabled={$accordionItemStore.disabled}
  on:click={toggle}><slot /></button
>
