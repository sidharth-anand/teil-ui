<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { MenuStoreType } from "../Menu/types";

  import type { DropdownStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  import Menu from "../Menu";

  export let disabled: boolean = false;

  if (!hasContext(CONTEXT.DROPDOWNMENU)) {
    throw new Error(
      "DropdownMenu.Trigger must be used inside DropdownMenu.Container"
    );
  }

  const menuStore = getContext<Writable<MenuStoreType>>(CONTEXT.MENU);
  const dropdownStore = getContext<Writable<DropdownStoreType>>(
    CONTEXT.DROPDOWNMENU
  );

  function toggle() {
    menuStore.update((state) => ({
      ...state,
      open: !state.open,
    }));
  }

  function pointerdown(event: PointerEvent) {
    if (!disabled && event.button === 0 && event.ctrlKey === false) {
      setTimeout(toggle);

      if (!$menuStore.open) {
        event.preventDefault();
      }
    }
  }

  function keydown(event: KeyboardEvent) {
    if (disabled) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      toggle();
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      menuStore.update((state) => ({
        ...state,
        open: true,
      }));

      event.preventDefault();
    }
  }

  $: {
    console.log($menuStore.open);
  }
</script>

<Menu.Anchor>
  <button
    type="button"
    id={$dropdownStore.triggerID}
    class={$$props.class}
    {disabled}
    aria-haspopup="menu"
    aria-expanded={$menuStore.open}
    aria-controls={$menuStore.open ? $dropdownStore.contentID : undefined}
    aria-disabled={disabled}
    on:pointerdown={pointerdown}
    on:keydown={keydown}
  >
    <slot />
  </button>
</Menu.Anchor>
