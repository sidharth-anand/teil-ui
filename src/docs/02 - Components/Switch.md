---
  layout: component
  title: Switch
  description: A control that allows the user to toggle between checked and not checked.
---

<script>
    import Switch from '$lib/components/Switch';
</script>

<style global>
.switch__container {
    display: flex;
    align-items: center;
    gap: 15px;
}
.switch__track {
    width: 40px;
    height: 20px;
    border-radius: 15px;
    background-color: #4c566a;
    display: flex;
    align-items: center;
    padding: 0;
    box-shadow: 0 2px 10px #2e344077;
}
.switch__thumb {
    background: #bf616a;
    width: 20px;
    height: 20px;
    border-radius: 15px;
    display: block;
    transform: translateX(0);
    transform-origin: center;
    will-change: transform;
    transition: transform 220ms cubic-bezier(0.65, 0, 0.35, 1);
}
.switch__track[aria-checked='true'] .switch__thumb {
    background: #a3be8c;
    transform: translateX(20px);
}
.switch__label {
    color: #434c5e;
}
</style>

<!--code start-->
<div class="switch__container" slot="component">
    <Switch.Track class="switch__track">
        <Switch.Thumb class="switch__thumb" />
    </Switch.Track>
    <label class="switch__label">Airplane Mode</label>
</div>
<!--code end-->

```svelte
<Switch.Track>
    <Switch.Thumb />
</Switch.Track>
```