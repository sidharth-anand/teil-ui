<script lang="ts">
  import type { Direction } from "../Menu/types";

  import Menu from "../Menu";

  export let open: boolean = false;
  export let modal: boolean = true;
  export let direction: Direction = "ltr";
</script>

<Menu.Container bind:open {modal} {direction}>
  <slot />
</Menu.Container>
