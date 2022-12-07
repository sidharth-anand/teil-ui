<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { AccordionItemStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.ACCORDION_ITEM)) {
    throw new Error("Accordion.Content must be used inside Accordion.Item");
  }

  const accordionItemStore = getContext<Writable<AccordionItemStoreType>>(
    CONTEXT.ACCORDION_ITEM
  );
</script>

<div class={$$props.class} id={$accordionItemStore.id}>
  {#if $accordionItemStore.open}
    <slot />
  {/if}
</div>
