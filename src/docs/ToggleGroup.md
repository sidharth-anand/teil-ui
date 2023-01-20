---
  title: ToggleGroup
  description: A set of two-state buttons that can be toggled on or off.
---

<script>
    import ToggleGroup from '$lib/components/ToggleGroup';
</script>

<style global>
.toggle__group {
    display: inline-flex;
    border-radius: 4px;
    box-shadow: 0 2px 10px #2e344077;
}
.toggle__group > .toggle {
    box-shadow: none;
    border-radius: 0;
}
.toggle__group > .toggle:first-of-type {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.toggle__group > .toggle:last-of-type {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.toggle {
    background-color: #eceff4;
    color: #5e81ac;
    height: 35px;
    width: 35px;
    border-radius: 4px;
    display: flex;
    font-size: 15px;
    line-height: 1;
    align-items: center;
    justify-content: center;
}
.toggle:hover {
    background-color: #5e81ac;
    color: #eceff4;
}
.toggle[aria-pressed='true'],
.toggle[aria-checked='true'] {
    background-color: #5e81ac;
    color: #eceff4;
}
.toggle:focus {
    box-shadow: 0 0 0 2px #2e344077;
}
</style>

<!--code start-->
<ToggleGroup.Group class="toggle__group" slot="component">
    <ToggleGroup.Button value="1" class="toggle">1</ToggleGroup.Button>
    <ToggleGroup.Button value="2" class="toggle">2</ToggleGroup.Button>
    <ToggleGroup.Button value="3" class="toggle">3</ToggleGroup.Button>
</ToggleGroup.Group>
<!--code end-->

```svelte
<ToggleGroup.Group>
    <ToggleGroup.Button />
</ToggleGroup.Group>
```