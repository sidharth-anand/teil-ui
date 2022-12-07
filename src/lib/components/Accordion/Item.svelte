<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { FocusStoreType } from "../Focus/types";
  import type { AccordionStoreType, AccordionItemStoreType } from "./types";

  import { hasContext, getContext, setContext } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";

  import Focus from "../Focus";
  import id from "../id";

  export let value: any;
  export let disabled: boolean = false;

  if (!hasContext(CONTEXT.ACCORDION)) {
    throw new Error("Accordion.Item must be used inside Accordion.Container");
  }

  const accordionStore = getContext<Writable<AccordionStoreType>>(
    CONTEXT.ACCORDION
  );
  const focusStore = getContext<Writable<FocusStoreType>>(CONTEXT.FOCUS);
  const accordionItemStore = writable<AccordionItemStoreType>({
    value,
    open: false,
    disabled,
    id: id(),
  });

  setContext(CONTEXT.ACCORDION_ITEM, accordionItemStore);

  $: {
    accordionItemStore.update(state => ({
        ...state,
        disabled: disabled || $accordionStore.disabled,
        open: $accordionStore.open.includes(value),
    }))
  }
</script>

<div class={$$props.class} use:Focus.Item={{ focusable: true, active: true, store: focusStore }}>
  <slot />
</div>
