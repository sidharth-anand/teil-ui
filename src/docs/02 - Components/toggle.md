---
  layout: component
  title: Toggle
  description: A two-state button that can be either on or off.
---

<script>
    import Toggle from '$lib/components/Toggle';
</script>

<style global>
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
    box-shadow: 0 2px 10px #2e344077;
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
<Toggle class="toggle" slot="component">I</Toggle>
<!--code end-->

```svelte
<Toggle/>
```