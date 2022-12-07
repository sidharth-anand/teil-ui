<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { CollapsibleStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.COLLAPSIBLE)) {
    throw new Error(
      "Collapsible.Trigger must be used inside Collapsible.Container"
    );
  }

  const collapsibleStore = getContext<Writable<CollapsibleStoreType>>(
    CONTEXT.COLLAPSIBLE
  );
</script>

<div id={$collapsibleStore.id} class={$$props.class}>
  {#if $collapsibleStore.open}
    <slot />
  {/if}
</div>
