---
  title: Checkbox
  description: A control that allows the user to toggle between checked and not checked.
---

<script>
    import Checkbox from '$lib/components/Checkbox';
</script>

<style global>
.checkbox__box {
  background-color: #5e81ac;
  width: 25px;
  height: 25px;
  display: flex;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px #2e344077;

}
.checkbox__indicator {
    color: #eceff4;
}
</style>

<!--code start-->
<Checkbox.Box slot="component" class="checkbox__box">
    <Checkbox.Indicator class="checkbox__indicator">
        <svelte:fragment slot="checked">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                <path d="M13.854 4.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
        </svelte:fragment>
    </Checkbox.Indicator>
</Checkbox.Box>
<!--code end-->

```svelte
<Checkbox.Box>
    <Checbox.Indicator>
        <svelte:fragment slot="checked"/>
        <svelte:fragment slot="indeterminate"/>
        <svelte:fragment slot="unchecked"/>
    </Checkbox.Indicator>
</Checkbox.Box>
```