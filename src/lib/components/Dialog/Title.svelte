<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { DialogStoreType } from "./types";

  import { hasContext, getContext } from "svelte";

  import { CONTEXT } from "../../constants";

  if (!hasContext(CONTEXT.DIALOG)) {
    throw new Error("Dialog.Content must be used inside Dialog.Container");
  }

  const dialogStore = getContext<Writable<DialogStoreType>>(CONTEXT.DIALOG);
</script>

<h2 id={$dialogStore.titleID} class={$$props.class}><slot /></h2>
