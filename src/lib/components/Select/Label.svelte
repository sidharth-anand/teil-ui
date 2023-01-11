<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { SelectGroupStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.SELECT)) {
    throw new Error("Select.Label must be used inside a Select.Container");
  }

  if (!hasContext(CONTEXT.SELECTGROUP)) {
    throw new Error("Select.Label must be used inside a Select.Group");
  }

  const selectGroupStore = getContext<Writable<SelectGroupStoreType>>(
    CONTEXT.SELECTGROUP
  );
</script>

<div id={$selectGroupStore.id} class={$$props.class}>
  <slot />
</div>
