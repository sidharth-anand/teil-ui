<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { Checked, MenuItemIndicatorStoreType } from "./types";

  import { hasContext, getContext, setContext } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";

  import Item from "./Item.svelte";

  export let value: string;
  export let checked: Checked = false;

  if (!hasContext(CONTEXT.MENU)) {
    throw new Error("Menu.CheckItem must be used inside Menu.Container");
  }

  if (!hasContext(CONTEXT.RADIO)) {
    throw new Error("Menu.ItemRadio must be used inside Menu.RadioGroup");
  }

  const radioStore = getContext<Writable<string>>(CONTEXT.RADIO);
  const indicatorStore = writable<MenuItemIndicatorStoreType>({
    checked: checked,
  });

  function toggle() {
    radioStore.set(value);
  }

  function keydown(event: KeyboardEvent) {
    if (event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.key === " " || event.key === "Enter") {
      toggle();
    }
  }

  setContext(CONTEXT.MENUINDICATOR, indicatorStore);

  $: checked = $radioStore === value;
  $: {
    indicatorStore.set({
      checked,
    });
  }
</script>

<Item
  role="menuitemradio"
  ariaChecked={checked}
  on:keydown={keydown}
  on:click={toggle}><slot /></Item
>
