<script lang="ts">
  import { hasContext, setContext } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";

  import Group from "./Group.svelte";

  export let value: string = "";

  if (!hasContext(CONTEXT.MENU)) {
    throw new Error("Menu.CheckItem must be used inside Menu.Container");
  }

  const radioStore = writable<string>(value);

  setContext(CONTEXT.RADIO, radioStore);

  $: {
    value = $radioStore;
  }
</script>

<Group class={$$props.class}><slot /></Group>
