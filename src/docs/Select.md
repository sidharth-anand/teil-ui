---
  title: Select (Combobox)
  description: Displays a list of options for the user to pick from—triggered by a button.
---

<script>
    import Select from '$lib/components/Select';

    import SelectItem from '$components/SelectItem.svelte';
</script>

<style global>
.SelectTrigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0 15px;
    font-size: 13px;
    line-height: 1;
    height: 35px;
    gap: 5px;
    background-color: #4c566a;
    color: #eceff4;
    box-shadow: 0 2px 10px #2e344077;
}
.SelectTrigger:hover {
    background-color: #434c5e;
}
.SelectTrigger:focus {
    box-shadow: 0 0 0 2px #2e3440;
}
.SelectTrigger[data-placeholder] {
    color: #eceff4;
}

.SelectIcon {
    color: #eceff4;
}

.SelectContent {
    overflow: hidden;
    background-color: #4c566a;
    border-radius: 6px;
    z-index:999;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
        0px 10px 20px -15px rgba(22, 23, 24, 0.2);
}

.SelectViewport {
    padding: 5px;
}

.SelectItem {
    font-size: 13px;
    line-height: 1;
    color: #eceff4;
    border-radius: 3px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 35px 0 25px;
    position: relative;
    user-select: none;
}
.SelectItem[aria-disabled="true"] {
    color: magenta;
    pointer-events: none;
}
.SelectItem:hover {
    outline: none;
    background-color: #5e81ac;
    color: #eceff4;
}

.SelectLabel {
    padding: 0 25px;
    font-size: 12px;
    line-height: 25px;
    color: #eceff4;
}

.SelectSeparator {
    height: 1px;
    background-color: #eceff4;
    margin: 5px;
}

.SelectItemIndicator {
    position: absolute;
    left: 0;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.SelectScrollButton {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    background-color: #4c566a;
    color: #5e81ac;
    cursor: default;
}
</style>

<!--code start-->
<Select.Container slot="component">
    <Select.Trigger class="SelectTrigger" aria-label="Food">
        <Select.Value placeholder="Select a fruit…" />
        <Select.Icon class="SelectIcon">+</Select.Icon>
    </Select.Trigger>
    <Select.Content class="SelectContent">
        <Select.Up class="SelectScrollButton">+</Select.Up>
        <Select.Viewport class="SelectViewport">
            <Select.Group>
                <Select.Label class="SelectLabel">Fruits</Select.Label>

                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
            </Select.Group>

            <Select.Separator class="SelectSeparator" />

            <Select.Group>
                <Select.Label class="SelectLabel">Vegetables</Select.Label>
                <SelectItem value="aubergine">Aubergine</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="courgette">Courgette</SelectItem>
                <SelectItem value="leek">leek</SelectItem>
            </Select.Group>

            <Select.Separator class="SelectSeparator" />

            <Select.Group>
                <Select.Label class="SelectLabel">Meat</Select.Label>
                <SelectItem value="beef">Beef</SelectItem>
                <SelectItem value="chicken">Chicken</SelectItem>
                <SelectItem value="lamb">Lamb</SelectItem>
                <SelectItem value="pork">Pork</SelectItem>
            </Select.Group>
        </Select.Viewport>
        <Select.Down class="SelectScrollButton">+</Select.Down>
    </Select.Content>
</Select.Container>
<!--code end-->

```svelte
<Select.Root>
    <Select.Trigger>
        <Select.Value />
        <Select.Icon />
    </Select.Trigger>

    <Select.Content>
        <Select.Up />
        <Select.Viewport>
            <Select.Item>
                <Select.ItemText />
                <Select.ItemIndicator />
            </Select.Item>

            <Select.Group>
                <Select.Label />
                <Select.Item>
                <Select.ItemText />
                <Select.ItemIndicator />
                </Select.Item>
            </Select.Group>

            <Select.Separator />
        </Select.Viewport>
        <Select.Down />
        <Select.Arrow />
    </Select.Content>
</Select.Root>
```