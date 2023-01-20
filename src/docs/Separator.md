---
  title: Separator
  description: Visually or semantically separates content.
---

<script>
    import Separator from '$lib/components/Separator';
</script>

<style global>
.SeparatorRoot {
  background-color: #434c5e;
}
.SeparatorRoot[aria-orientation='horizontal'] {
  height: 1px;
  width: 100%;
}
.SeparatorRoot {
  height: 100%;
  width: 1px;
}
.Text {
  color: #434c5e;
  font-size: 15px;
  line-height: 20px;
}
</style>

<!--code start-->
<div style="width: 300px; margin: 0 15px;" slot="component">
    <div class="Text">An open-source UI component library.</div>
    <Separator class="SeparatorRoot" style="margin: 15px 0;" />
    <div style="display: flex; height: 20px; align-items: center;">
        <div class="Text">Blog</div>
        <Separator
            class="SeparatorRoot"
            decorative
            orientation="vertical"
            style="margin: 0 15px;"
        />
        <div class="Text">Docs</div>
        <Separator
            class="SeparatorRoot"
            decorative
            orientation="vertical"
            style="margin: 0 15px;"
        />
        <div class="Text">Source</div>
    </div>
</div>
<!--code end-->

```svelte
<Separator />
```