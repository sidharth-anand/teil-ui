---
  layout: component
  title: Tabs
  description: A control that allows the user to toggle between checked and not checked.
---

<script>
    import Tabs from '$lib/components/Tabs';
</script>

<style global>
.tabs__container {
    display: flex;
    flex-direction: column;
    width: 300px;
    box-shadow: 0 2px 10px #2e344077;
    border-radius: 6px;
}
.tabs__list {
    flex-shrink: 0;
    display: flex;
    border-bottom: 1px solid #2e3440;
}
.tabs__trigger {
    font-family: inherit;
    background-color: #4c566a;
    padding: 0 20px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    line-height: 1;
    color: #eceff4;
    user-select: none;
    border-radius: 0;
}

.tabs__trigger:first-child {
    border-top-left-radius: 6px;
}
.tabs__trigger:last-child {
    border-top-right-radius: 6px;
}
.tabs__trigger:hover {
    color: #88c0d0;
}
.tabs__trigger[aria-expanded='true'] {
    color: #88c0d0;
    box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor;
}
.tabs__trigger:focus {
    position: relative;
    outline: none;
}
.tabs__content {
    flex-grow: 1;
    padding: 20px;
    background-color: #4c566a;
    color: #eceff4;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    outline: none;
}
.tabs__content:focus {
    box-shadow: 0 0 0 2px black;
}
</style>

<!--code start-->
<Tabs.Container class="tabs__container" value="1" slot="component">
    <Tabs.List class="tabs__list">
        <Tabs.Trigger value="1" class="tabs__trigger">Account</Tabs.Trigger>
        <Tabs.Trigger value="2" class="tabs__trigger">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="1" class="tabs__content">Tab 1</Tabs.Content>
    <Tabs.Content value="2" class="tabs__content">Tab 2</Tabs.Content>
</Tabs.Container>
<!--code end-->


```svelte
<Tabs.Container>
    <Tabs.List>
        <Tabs.Trigger />
    </Tabs.List>
    <Tabs.Content />
</Tabs.Container>
```