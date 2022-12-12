<script lang="ts">
  import type { DismissableStoreType } from "./types";

  import {
    createEventDispatcher,
    setContext,
    onMount,
    onDestroy,
  } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";

  type EventTypes = {
    escape: KeyboardEvent;
    pointerDownOutside: PointerEvent;
    focusOutside: FocusEvent;
    interactOutside: PointerEvent | FocusEvent;
    dismiss: void;
  };

  export let disableOutsidePointerEvents: boolean = false;

  const dispatch = createEventDispatcher<EventTypes>();

  const dismissableStore = writable<DismissableStoreType>({
    layers: new Set<HTMLElement>(),
    pointerDisabled: new Set<HTMLElement>(),
    branches: new Set<HTMLElement>(),
  });

  setContext(CONTEXT.DISMISSABLE, dismissableStore);

  let node: HTMLElement = null;
  let documentPointerEvents: string = "";

  let pointerInside = false;
  let focusInside = false;

  $: layers = [...$dismissableStore.layers];
  $: [highestDisabledLayer] = [...$dismissableStore.pointerDisabled].slice(-1);
  $: highestDisabledLayerIndex = layers.indexOf(highestDisabledLayer);
  $: index = node ? layers.indexOf(node) : -1;
  $: highestLayer = index === layers.length - 1;

  $: bodyPointerEventsDisabled = $dismissableStore.pointerDisabled.size > 0;
  $: pointerEventsEnabled = index >= highestDisabledLayerIndex;

  function outsideEvent(event: PointerEvent | FocusEvent) {
    const isBranch = [...$dismissableStore.branches].some((branch) =>
      branch.contains(event.target as HTMLElement)
    );

    if (!pointerEventsEnabled || isBranch) {
      return;
    }

    if (event instanceof PointerEvent) {
      dispatch("pointerDownOutside", event, {
        cancelable: true,
      });
    } else {
      dispatch("focusOutside", event, {
        cancelable: true,
      });
    }

    dispatch("interactOutside", event, {
      cancelable: true,
    });

    if (!event.defaultPrevented) {
      dispatch("dismiss");
    }
  }

  function pointerDown(event: PointerEvent) {
    if (event.target && !pointerInside) {
      const dispatchEvent = () => outsideEvent(event);

      if (event.pointerType === "touch") {
        document.removeEventListener("click", dispatchEvent);
        document.addEventListener("click", dispatchEvent, { once: true });
      } else {
        dispatchEvent();
      }

      pointerInside = false;
    }
  }

  function focusOutside(event: FocusEvent) {
    if (event.target && !focusInside) {
      outsideEvent(event);
      focusInside = false;
    }
  }

  function keypress(event: KeyboardEvent) {
    if (event.key === "Escape" && highestLayer) {
      dispatch("escape", event);

      if (!event.defaultPrevented) {
        dispatch("dismiss");
      }
    }
  }

  $: {
    if (node) {
      if (disableOutsidePointerEvents) {
        if ($dismissableStore.pointerDisabled.size === 0) {
          documentPointerEvents = document.body.style.pointerEvents;
          document.body.style.pointerEvents = "none";
        }

        dismissableStore.update((state) => ({
          ...state,
          pointerDisabled: new Set([...state.pointerDisabled, node]),
        }));
      }
    }
  }

  onMount(() => {
    document.addEventListener("pointerdown", pointerDown);
    document.addEventListener("focusin", focusOutside);
    document.addEventListener("keypress", keypress);
  });

  onDestroy(() => {
    if (
      disableOutsidePointerEvents &&
      $dismissableStore.pointerDisabled.size === 1
    ) {
      document.body.style.pointerEvents = documentPointerEvents;
    }

    dismissableStore.update((state) => {
      const layers = new Set(state.layers);
      const pointerDisabled = new Set(state.pointerDisabled);

      layers.delete(node);
      pointerDisabled.delete(node);

      return {
        ...state,
        layers,
        pointerDisabled,
      };
    });
  });

  //TODO: Support multiple independent dismissable layers
</script>

<div
  bind:this={node}
  class={$$props.class}
  style="pointer-events: {bodyPointerEventsDisabled
    ? pointerEventsEnabled
      ? 'auto'
      : 'none'
    : undefined}"
  on:focus|capture={() => {
    focusInside = true;
  }}
  on:blur|capture={() => {
    focusInside = false;
  }}
  on:pointerdown|capture={() => {
    pointerInside = true;
  }}
>
  <slot />
</div>
