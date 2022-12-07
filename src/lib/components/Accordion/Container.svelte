<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";

  import Focus from "../Focus";
  import { createFocusContext } from "../Focus/context";

  import type { AccordionType, AccordionStoreType } from "./types";

  export let value: any | Array<any> = [];
  export let type: AccordionType = "single";
  export let disabled: boolean = false;

  if (!(value instanceof Array)) {
    value = [value];
  }

  const accordionStore = writable<AccordionStoreType>({
    open: value,
    type,
    disabled,
  });
  const focusStore = createFocusContext("vertical", "rtl", true, true);

  setContext(CONTEXT.ACCORDION, accordionStore);
  setContext(CONTEXT.FOCUS, focusStore);
</script>

<div class={$$props.class} use:Focus.Group={focusStore}><slot /></div>
