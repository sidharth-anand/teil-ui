<script lang="ts">
  import { hasContext, setContext } from "svelte";
  import { writable } from "svelte/store";

  import type { SwitchStoreType } from "./types";

  import { CONTEXT } from "../../constants";

  export let checked: boolean = false;
  export let disabled: boolean = false;

  const isFormControl = hasContext(CONTEXT.FORM);

  const switchStore = writable<SwitchStoreType>({
    checked,
  });

  setContext(CONTEXT.SWITCH, switchStore);

  $: {
    switchStore.update((_) => ({
      checked,
    }));
  }
</script>

<button
  class={$$props.class}
  type="button"
  role="switch"
  {checked}
  {disabled}
  aria-checked={checked}
  aria-disabled={disabled}
  on:click={(event) => {
    checked = !checked;
    if (isFormControl) {
      event.stopPropagation();
    }
  }}><slot /></button
>
