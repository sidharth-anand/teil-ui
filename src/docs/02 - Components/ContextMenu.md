---
  layout: component
  title: ContextMenu
  description: Displays a menu located at the pointer, triggered by a right-click or a long-press.
  exclude: [Anchor]
---

<script>
    import ContextMenu from '$lib/components/ContextMenu';
</script>

<style global>
.popper-content {
  z-index: 999;
}
.contextmenu__area {
    display: block;
    color: #2e3440;
    border: 2px dashed #2e3440;
    text-align: center;
    padding: 35px 45px;
}
.contextmenu__content,
.contextmenu__subcontent {
  min-width: 220px;
  background-color: #3b4252;
  border-radius: 3px;
  overflow: hidden;
  padding: 5px;
  box-shadow:  0 2px 10px #2e344077;
}
.contextmenu__item,
.contextmenu__checkboxitem,
.contextmenu__radioitem,
.contextmenu__subtrigger {
  font-size: 13px;
  color: #88c0d0;
  line-height: 1;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;
}

.contextmenu__item[aria-disabled="true"],
.contextmenu__checkboxitem[aria-disabled="true"],
.contextmenu__radioitem[aria-disabled="true"],
.contextmenu__subtrigger[aria-disabled="true"] {
  color: #4c566a;
  pointer-events: 'none';
}

.contextmenu__item[data-active="true"],
.contextmenu__checkboxitem[data-active="true"],
.contextmenu__radioitem[data-active="true"],
.contextmenu__subtrigger[data-active="true"] {
  background-color: #88c0d0;
  color: #3b4252;
}

.contextmenu__indicator {
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.contextmenu__label {
  padding-left: 25px;
  font-size: 12px;
  line-height: 25px;
  color: #d8dee9;
}
</style>

<!--code start-->
<ContextMenu.Container slot="component">
    <ContextMenu.Trigger class="contextmenu__area">
        Right click for context menu
    </ContextMenu.Trigger>
    <ContextMenu.Content class="contextmenu__content">
        <ContextMenu.Group>
            <ContextMenu.Item class="contextmenu__item">Item 1</ContextMenu.Item>
            <ContextMenu.Item class="contextmenu__item" disabled>Item 2</ContextMenu.Item>
            <ContextMenu.Item class="contextmenu__item">Item 3</ContextMenu.Item>
            <ContextMenu.Sub class="contextmenu__subtrigger">
                <span slot="item">Submenu Item</span>
                <ContextMenu.Content class="contextmenu__subcontent" slot="menu">
                    <ContextMenu.Group>
                        <ContextMenu.Item class="contextmenu__item">Submenu Item 1</ContextMenu.Item>
                        <ContextMenu.Item class="contextmenu__item">Submenu Item 2</ContextMenu.Item>
                        <ContextMenu.Item class="contextmenu__item">Submenu Item 3</ContextMenu.Item>
                    </ContextMenu.Group>
                </ContextMenu.Content>
            </ContextMenu.Sub>
            <ContextMenu.ItemCheck class="contextmenu__checkboxitem">
                Check Item
                <ContextMenu.ItemIndicator class="contextmenu__indicator">
                    <svelte:fragment slot="checked">+</svelte:fragment>
                </ContextMenu.ItemIndicator>
            </ContextMenu.ItemCheck>
        </ContextMenu.Group>
        <ContextMenu.Label class="contextmenu__label">Radio Group</ContextMenu.Label>
        <ContextMenu.RadioGroup>
            <ContextMenu.ItemRadio class="contextmenu__radioitem" value="a">
                <ContextMenu.ItemIndicator class="contextmenu__indicator">
                    <svelte:fragment slot="checked">+</svelte:fragment>
                </ContextMenu.ItemIndicator> 
                Option A
            </ContextMenu.ItemRadio>
            <ContextMenu.ItemRadio class="contextmenu__radioitem" value="b">
                <ContextMenu.ItemIndicator class="contextmenu__indicator">
                    <svelte:fragment slot="checked">+</svelte:fragment>
                </ContextMenu.ItemIndicator>
                Option B
            </ContextMenu.ItemRadio>
            <ContextMenu.ItemRadio class="contextmenu__radioitem" value="c">
                <ContextMenu.ItemIndicator class="contextmenu__indicator">
                    <svelte:fragment slot="checked">+</svelte:fragment>
                </ContextMenu.ItemIndicator> 
                Option C
            </ContextMenu.ItemRadio>
        </ContextMenu.RadioGroup>
    </ContextMenu.Content>
</ContextMenu.Container>
<!--code end-->

```svelte
<ContextMenu.Container>
  <ContextMenu.Trigger />
  <ContextMenu.Content>
    <ContextMenu.Label />
    <ContextMenu.Item />

    <ContextMenu.Group>
      <ContextMenu.Item />
    </ContextMenu.Group>

    <ContextMenu.CheckboxItem>
      <ContextMenu.ItemIndicator />
    </ContextMenu.CheckboxItem>

    <ContextMenu.RadioGroup>
      <ContextMenu.RadioItem>
        <ContextMenu.ItemIndicator />
      </ContextMenu.RadioItem>
    </ContextMenu.RadioGroup>

    <ContextMenu.Sub>
      <ContextMenu.Content />
    </ContextMenu.Sub>

    <ContextMenu.Separator />
  </ContextMenu.Content>
</ContextMenu.Container>

```