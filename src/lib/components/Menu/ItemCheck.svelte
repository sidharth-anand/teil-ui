<script lang="ts">
  import type { Checked, MenuItemIndicatorStoreType } from "./types";

  import { hasContext, getContext, setContext } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";

  import Item from "./Item.svelte";

  export let checked: Checked = false;

  if (!hasContext(CONTEXT.MENU)) {
    throw new Error("Menu.CheckItem must be used inside Menu.Container");
  }

  const indicatorStore = writable<MenuItemIndicatorStoreType>({
    checked: checked,
  });

  function toggle() {
    checked = checked === "indeterminate" ? true : !checked;
    indicatorStore.set({ checked: checked });
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

  $: checked = $indicatorStore.checked;
</script>

<Item
  role="menuitemcheckbox"
  ariaChecked={checked}
  on:keydown={keydown}
  on:click={toggle}><slot /></Item
>
