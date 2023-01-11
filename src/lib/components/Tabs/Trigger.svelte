<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { FocusStoreType } from "../Focus/types";
  import type { TabsStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  import Focus from "../Focus";

  export let value: string;
  export let disabled: boolean = false;

  if (!hasContext(CONTEXT.TABS)) {
    throw new Error("Tabs.Trigger must be used inside a Tabs.Container");
  }

  const tabsStore = getContext<Writable<TabsStoreType>>(CONTEXT.TABS);
  const focusStore = getContext<Writable<FocusStoreType>>(CONTEXT.FOCUS);

  $: selected = $tabsStore.value === value;

  function mousedown(event: MouseEvent) {
    if (!disabled && event.button === 0 && event.ctrlKey === false) {
      $tabsStore.value = value;
    } else {
      event.preventDefault();
    }
  }

  function keydown(event: KeyboardEvent) {
    if (event.key === " " || event.key === "Enter") {
      $tabsStore.value = value;
    }
  }

  function focus() {
    if (!selected && !disabled && $tabsStore.activation === "automatic") {
      $tabsStore.value = value;
    }
  }
</script>

<button
  type="button"
  role="tab"
  id={`${$tabsStore.id}-trigger-${value}`}
  class={$$props.class}
  {disabled}
  aria-selected={selected}
  aria-controls={`${$tabsStore.id}-content-${value}`}
  aria-disabled={disabled}
  aria-expanded={selected}
  on:mousedown={mousedown}
  on:keydown={keydown}
  on:focus={focus}
  use:Focus.Item={{
    store: focusStore,

    active: selected,
    focusable: !disabled,
  }}
>
  <slot />
</button>
