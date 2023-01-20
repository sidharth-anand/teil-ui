---
  title: Label
  description: Renders an accessible label associated with controls.
---

<script>
    import Label from '$lib/components/Label';
</script>

<style global>
.label {
    color: #434c5e;
}
</style>

<!--code start-->
<Label class="label" slot="component">First Name</Label>
<!--code end-->

```svelte
<Label />
```