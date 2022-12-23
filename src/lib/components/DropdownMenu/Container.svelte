<script lang="ts">
  import type { Direction } from "../Menu/types";

  import type { DropdownStoreType } from "./types";

  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";

  import Menu from "../Menu";
  import id from "../id";

  export let open: boolean = false;
  export let modal: boolean = true;
  export let direction: Direction = "ltr";

  const dropdownStore = writable<DropdownStoreType>({
    triggerID: id(),
    contentID: id(),
  });

  setContext(CONTEXT.DROPDOWNMENU, dropdownStore);
</script>

<Menu.Container {open} {modal} {direction}>
  <slot />
</Menu.Container>
