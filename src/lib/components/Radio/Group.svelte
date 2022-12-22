<script lang="ts">
  import { setContext } from "svelte";

  import { CONTEXT } from "../../constants";

  import { writable } from "svelte/store";

  import Focus from "../Focus";
  import { createFocusContext } from "../Focus/context";

  import type { Direction, Orientation } from "../Focus/types";
  import type { RadioStoreType } from "./types";

  export let disabled: boolean = false;
  export let value: string | undefined = undefined;

  export let direction: Direction = "ltr";
  export let orientation: Orientation = "both";
  export let loop: boolean = true;

  const radioStore = writable<RadioStoreType>({
    value,
    disabled,
  });

  const focusStore = createFocusContext({ orientation, direction, loop });

  setContext(CONTEXT.RADIO, radioStore);
  setContext(CONTEXT.FOCUS, focusStore);
</script>

<div
  use:Focus.Group={focusStore}
  class={$$props.class}
  role="radiogroup"
  aria-orientation={orientation === "both" ? undefined : orientation}
  {disabled}
  aria-disabled={disabled}
  dir={direction}
>
  <slot />
</div>
