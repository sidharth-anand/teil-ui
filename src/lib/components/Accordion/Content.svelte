<script lang="ts">
  import { hasContext } from "svelte";

  import { CONTEXT } from "../../constants";

  import Collapsible from "../Collapsible";

  if (!hasContext(CONTEXT.ACCORDION_ITEM)) {
    throw new Error("Accordion.Content must be used inside Accordion.Item");
  }
</script>

<Collapsible.Content class={$$props.class}><slot /></Collapsible.Content>
