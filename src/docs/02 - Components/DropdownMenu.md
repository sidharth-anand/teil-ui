---
  layout: component
  title: Dropdown Menu
  description: Displays a menu to the user—such as a set of actions or functions—triggered by a button.
  exclude: [Anchor]
---

<script>
    import DropdownMenu from '$lib/components/DropdownMenu';
</script>

<style global>
.dropdown__trigger{
    border-radius: 100%;
    background: #3b4252;
    width: 40px;
    height: 40px;
}    
.dropdown__content,
.dropdown__subcontent {
  min-width: 100px;
  background-color: #3b4252;
  border-radius: 3px;
  overflow: hidden;
  padding: 5px;
  box-shadow:  0 2px 10px #2e344077;
}
.dropdown__item,
.dropdown__checkboxitem,
.dropdown__radioitem,
.dropdown__subtrigger {
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

.dropdown__item[aria-disabled="true"],
.dropdown__checkboxitem[aria-disabled="true"],
.dropdown__radioitem[aria-disabled="true"],
.dropdown__subtrigger[aria-disabled="true"] {
  color: #4c566a;
  pointer-events: 'none';
}

.dropdown__item[data-active="true"],
.dropdown__checkboxitem[data-active="true"],
.dropdown__radioitem[data-active="true"],
.dropdown__subtrigger[data-active="true"] {
  background-color: #88c0d0;
  color: #3b4252;
}

.dropdown__arrow {
    fill: #3b4252;
}
</style>

<!--code start-->
<DropdownMenu.Container class="dropdown__container" slot="component">
    <DropdownMenu.Trigger class="dropdown__trigger">+</DropdownMenu.Trigger>
    <DropdownMenu.Content class="dropdown__content">
        <DropdownMenu.Arrow class="dropdown__arrow"/>
        <DropdownMenu.Item class="dropdown__item">
            Item 1
        </DropdownMenu.Item>
        <DropdownMenu.Item class="dropdown__item">
            Item 2
        </DropdownMenu.Item>
        <DropdownMenu.Item class="dropdown__item">
            Item 3
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Container>
<!--code end-->

```svelte
<DropdownMenu.Container>
    <DropdownMenu.Trigger />

    <DropdownMenu.Content>
        <DropdownMenu.Label />
        <DropdownMenu.Item />

        <DropdownMenu.Group>
            <DropdownMenu.Item />
        </DropdownMenu.Group>

        <DropdownMenu.CheckboxItem>
            <DropdownMenu.ItemIndicator />
        </DropdownMenu.CheckboxItem>

        <DropdownMenu.RadioGroup>
            <DropdownMenu.RadioItem>
            <DropdownMenu.ItemIndicator />
            </DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>

        <DropdownMenu.Sub>
            <DropdownMenu.SubContent />
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Arrow />
    </DropdownMenu.Content>
</DropdownMenu.Container>
```