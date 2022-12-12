<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { DismissableStoreType } from "./types";

  import { hasContext, getContext, onMount, onDestroy } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.DISMISSABLE)) {
    throw new Error(
      "Dismissable component must be used within a Dismissable.Container component"
    );
  }

  const dismissableStore = getContext<Writable<DismissableStoreType>>(
    CONTEXT.DISMISSABLE
  );

  let node: HTMLElement = null;

  onMount(() => {
    dismissableStore.update((state) => ({
      ...state,
      branches: new Set([...state.branches, node]),
    }));
  });

  onDestroy(() => {
    dismissableStore.update((state) => ({
      ...state,
      branches: new Set(
        [...state.branches].filter((branch) => branch !== node)
      ),
    }));
  });
</script>

<div><slot /></div>
