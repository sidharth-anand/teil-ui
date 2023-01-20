---
  title: ContextMenu
  description: Displays a menu located at the pointer, triggered by a right-click or a long-press.
---

<script>
    import ContextMenu from '$lib/components/ContextMenu';
</script>

<style global>
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

.contextmenu__item a,
.contextmenu__checkboxitem a,
.contextmenu__radioitem a,
.contextmenu__subtrigger a {
  color: #88c0d0;
  text-decoration: none;
  cursor: default;
}

.contextmenu__item[aria-disabled="true"],
.contextmenu__checkboxitem[aria-disabled="true"],
.contextmenu__radioitem[aria-disabled="true"],
.contextmenu__subtrigger[aria-disabled="true"] {
  color: #4c566a;
  pointer-events: 'none';
}

.contextmenu__item[aria-disabled="true"] a,
.contextmenu__checkboxitem[aria-disabled="true"] a,
.contextmenu__radioitem[aria-disabled="true"] a,
.contextmenu__subtrigger[aria-disabled="true"] a{
  color: #4c566a;
}

.contextmenu__item[data-active="true"],
.contextmenu__checkboxitem[data-active="true"],
.contextmenu__radioitem[data-active="true"],
.contextmenu__subtrigger[data-active="true"] {
  background-color: #88c0d0;
  color: #3b4252;
}

.contextmenu__item[data-active="true"] a,
.contextmenu__checkboxitem[data-active="true"] a,
.contextmenu__radioitem[data-active="true"] a,
.contextmenu__subtrigger[data-active="true"]  a{
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
            <ContextMenu.Item class="contextmenu__item"><a>Item 1</a></ContextMenu.Item>
            <ContextMenu.Item class="contextmenu__item" disabled><a>Item 2</a></ContextMenu.Item>
            <ContextMenu.Item class="contextmenu__item"><a>Item 3</a></ContextMenu.Item>
            <ContextMenu.Sub class="contextmenu__subtrigger">
                <a slot="item">Submenu Item</a>
                <ContextMenu.Content class="contextmenu__subcontent" slot="menu">
                    <ContextMenu.Group>
                        <ContextMenu.Item class="contextmenu__item"><a>Submenu Item 1</a></ContextMenu.Item>
                        <ContextMenu.Item class="contextmenu__item"><a>Submenu Item 2</a></ContextMenu.Item>
                        <ContextMenu.Item class="contextmenu__item"><a>Submenu Item 3</a></ContextMenu.Item>
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