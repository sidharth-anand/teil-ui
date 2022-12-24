<script lang="ts">
  import type { HoverCardStoreType } from "./types";

  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";

  import Popper from "../Popper";

  export let open: boolean = false;

  const hoverCardStore = writable<HoverCardStoreType>({
    open,
  });

  setContext(CONTEXT.HOVERCARD, hoverCardStore);
</script>

<Popper.Container>
  <slot />
</Popper.Container>
