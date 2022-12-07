<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import type { CollapsibleStoreType } from "./types";

  import { CONTEXT } from "../../constants";

  import id from "../id";

  export let disabled: boolean = false;
  export let open: boolean = false;

  const collapsibleStore = writable<CollapsibleStoreType>({
    open,
    disabled,
    id: id(),
  });

  setContext(CONTEXT.COLLAPSIBLE, collapsibleStore);
</script>

<div class={$$props.class}><slot /></div>
