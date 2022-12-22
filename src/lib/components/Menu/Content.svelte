<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { FocusIntent } from "../Focus/types";
  import type { MenuStoreType, SubmenuStoreType } from "./types";

  import { hasContext, getContext, setContext } from "svelte";

  import { hideOthers } from "aria-hidden";

  import { CONTEXT } from "../../constants";
  import {
    NAVIGATION_KEYS,
    NAVIGATION_UP_KEYS,
    SUBMENU_CLOSE_KEYS,
  } from "./constants";

  import { createDismissableContext } from "../Dismissable/context";
  import { createFocusContext } from "../Focus/context";

  import Dismissable from "../Dismissable";
  import Focus from "../Focus";
  import Popper from "../Popper";

  if (!hasContext(CONTEXT.MENU)) {
    throw new Error("Menu.Anchor must be used inside Menu.Container");
  }

  const menuStore = getContext<Writable<MenuStoreType>>(CONTEXT.MENU);

  if ($menuStore.submenu && !hasContext(CONTEXT.SUBMENU)) {
    throw new Error(
      "Menu.Content marked as a submenu must be used inside Menu.Sub"
    );
  }

  const submenuStore = getContext<Writable<SubmenuStoreType> | undefined>(
    CONTEXT.SUBMENU
  );

  const dismissableStore = createDismissableContext();
  const focusStore = createFocusContext({
    orientation: "vertical",
    direction: $menuStore.direction,
    loop: true,
    forceFocusAll: true,
    forceFocusContainer: true,
    forceFocusFirst: $menuStore.submenu,
    focusContainerOnMount: true,
    blurContainerOnLeave: true,
  });

  let element: HTMLElement = null;

  $: {
    if (element && $menuStore.open) {
      hideOthers(element);
    }
  }

  $: trapFocus = $menuStore.open && $menuStore.modal && !$menuStore.submenu;
  $: disableOutsidePointerEvents =
    $menuStore.open && $menuStore.modal && !$menuStore.submenu;
  $: disableOutsideScroll = $menuStore.modal && !$menuStore.submenu;

  function focusOutside(event: CustomEvent<FocusEvent>) {
    if (
      trapFocus ||
      ($menuStore.submenu && $submenuStore.trigger === event.detail.target)
    ) {
      event.preventDefault();
      return;
    }

    if ($menuStore.submenu) {
      submenuStore.update((state) => ({
        ...state,
        open: false,
      }));
    }
  }

  function escape() {
    if ($menuStore.submenu) {
      $submenuStore.root.update((state) => ({
        ...state,
        open: false,
      }));
    }
  }

  function dismiss() {
    menuStore.update((state) => ({
      ...state,
      open: false,
    }));

    if ($menuStore.submenu) {
      submenuStore.update((state) => ({
        ...state,
        open: false,
      }));
    }
  }

  function keydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;

    const modifier = event.ctrlKey || event.altKey || event.metaKey;
    const character = event.key.length === 1;

    const inside =
      target.closest("[data-menu-content]") === event.currentTarget;

    if (inside) {
      if ($menuStore.submenu) {
        if (SUBMENU_CLOSE_KEYS[$menuStore.direction].includes(event.key)) {
          menuStore.update((state) => ({
            ...state,
            open: false,
          }));

          $submenuStore.refocus();
          event.preventDefault();

          return;
        }
      } else {
        if (event.key === "Tab") event.preventDefault();

        if (!modifier && character) typeahead(event.key);
      }
    }

    if (target !== element) return;
    if (!NAVIGATION_KEYS.includes(event.key)) return;

    event.preventDefault();

    const intent: FocusIntent = NAVIGATION_UP_KEYS.includes(event.key)
      ? "previous"
      : "next";

    $focusStore.shiftFocus(intent);
  }

  function pointerleave() {
    if ($menuStore.submenu) {
      menuStore.update((state) => ({
        ...state,
        open: false,
      }));

      focusStore.update((state) => ({
        ...state,
        currentStopIndex: undefined,
        focusContainerOnMount: false
      }));

      $submenuStore.reset?.();
    }
  }

  function typeahead(character: string) {
    //TODO: Implement
  }

  setContext(CONTEXT.FOCUS, focusStore);
  setContext(CONTEXT.DISMISSABLE, dismissableStore);

  //TODO: Handle scroll locking other components
  //TODO: Remove listeners ondestroy

  $: {
    if ($menuStore.submenu) {
      focusStore.update((state) => ({
        ...state,
        focusContainerOnMount: $menuStore.keyboard,
      }));
    }
  }

  $: {
    if ($menuStore.submenu && element) {
      submenuStore.update((state) => ({
        ...state,
        content: element,
      }));
    }
  }
</script>

<Popper.Content
  side={$menuStore.submenu
    ? $menuStore.direction === "ltr"
      ? "right"
      : "left"
    : "bottom"}
  alignment="start"
>
  {#if $menuStore.open}
    <div
      bind:this={element}
      id={$menuStore.submenu ? $submenuStore.contentID : null}
      class={$$props.class}
      aria-labelledby={$menuStore.submenu ? $submenuStore.triggerID : null}
      data-menu-content
      on:focusOutside={focusOutside}
      on:escape={escape}
      on:dismiss={dismiss}
      on:keydown={keydown}
      on:pointerleave={pointerleave}
      use:Focus.Group={focusStore}
      use:Dismissable.Layer={{
        store: dismissableStore,
        disableOutsidePointerEvents,
      }}
    >
      <slot />
    </div>
  {/if}
</Popper.Content>
