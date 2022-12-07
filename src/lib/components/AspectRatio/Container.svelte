<script lang="ts">
  export let ratio: number = 1;
</script>

<div
  class={"aspect-ratio " + ($$props.class || "")}
  style="padding-bottom: {100 / ratio}%;"
>
  <div class="aspect-ratio__inset"><slot /></div>
</div>

<style>
  .aspect-ratio {
    position: relative;
    width: 100%;
  }

  .aspect-ratio__inset {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
