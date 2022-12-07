<script lang="ts">
  import { hasContext, getContext, onMount } from "svelte";
  import type { Writable } from "svelte/store";

  import Focus from "../Focus";

  import { CONTEXT } from "../../constants";

  import type { FocusStoreType } from "../Focus/types";
  import type { RadioStoreType } from "./types";

  export let value: any;

  if (!hasContext(CONTEXT.RADIO)) {
    throw new Error("Radio.Button must be used inside Radio.Group");
  }

  const radioStore = getContext<Writable<RadioStoreType>>(CONTEXT.RADIO);
  const focusStore = getContext<Writable<FocusStoreType>>(CONTEXT.FOCUS);

  $: checked = $radioStore.value === value;

  let arrowKeyNavigation = false;

  onMount(() => {
    document.addEventListener("keydown", (event) => {
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      ) {
        arrowKeyNavigation = true;
      } else {
        arrowKeyNavigation = false;
      }
    });
  });

  function update() {
    radioStore.update((state) => ({
      ...state,
      value,
    }));
  }

  function focus() {
    if (arrowKeyNavigation) {
      update();
    }
  }
</script>

<button
  use:Focus.Item={{
    focusable: true,
    active: checked,
    store: focusStore,
  }}
  class={$$props.class}
  {checked}
  aria-checked={checked}
  disabled={$radioStore.disabled}
  aria-disabled={$radioStore.disabled}
  {value}
  on:click={(event) => {
    update();
    event.stopPropagation();
  }}
  on:keydown={(event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }}
  on:focus={focus}
  ><slot />
</button>
