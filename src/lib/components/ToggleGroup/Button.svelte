<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { FocusStoreType } from "../Focus/types";
  import type { ToggleGroupStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  import Focus from "../Focus";

  export let value: string;
  export let disabled: boolean = false;

  if (!hasContext(CONTEXT.TOGGLEGROUP)) {
    throw new Error(
      "ToggleGroup.Button must be used within a ToggleGroup.Group"
    );
  }

  const toggleGroupStore = getContext<Writable<ToggleGroupStoreType>>(
    CONTEXT.TOGGLEGROUP
  );
  const focusStore = getContext<Writable<FocusStoreType>>(CONTEXT.FOCUS);

  function toggle() {
    if (disabled || $toggleGroupStore.disabled) {
      return;
    }

    if ($toggleGroupStore.type === "single") {
      toggleGroupStore.update((state) => ({
        ...state,
        value: pressed ? "" : value,
      }));
    } else {
      console.log(pressed, $toggleGroupStore.value);
      toggleGroupStore.update((state) => ({
        ...state,
        value: pressed
          ? (state.value as string[]).filter((v) => v !== value)
          : [...state.value, value],
      }));
    }
  }

  $: pressed = Array.isArray($toggleGroupStore.value)
    ? $toggleGroupStore.value.includes(value)
    : $toggleGroupStore.value === value;

//TODO: Native form control
//TODO: Fix keyboard navigation - refactor entire focus group implementation
</script>

<button
  type="button"
  role={$toggleGroupStore.type === "single" ? "radio" : undefined}
  class={$$props.class}
  aria-pressed={$toggleGroupStore.type === "single" ? pressed : undefined}
  aria-checked={$toggleGroupStore.type === "single" ? undefined : pressed}
  aria-disabled={disabled}
  on:click={toggle}
  use:Focus.Item={{
    store: focusStore,
    focusable: disabled || $toggleGroupStore.disabled,
    active: pressed,
  }}
>
  <slot />
</button>
