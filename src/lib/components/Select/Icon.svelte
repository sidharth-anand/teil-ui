<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { SelectStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.SELECT)) {
    throw new Error("Select.Value must be used inside a Select.Container");
  }

  const selectStore = getContext<Writable<SelectStoreType>>(CONTEXT.SELECT);
</script>

<span class={$$props.class} data-state={$selectStore.open}>
  <slot>▼</slot>
</span>
