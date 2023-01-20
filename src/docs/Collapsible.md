---
  title: Collapsible
  description: An interactive component which expands/collapses a panel.
---

<script>
    import Collapsible from '$lib/components/Collapsible';
</script>

<style global>
.collapsible__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
}
.collapsible__header {
    width: 30%;
    display: flex;
    justify-content: space-between;
}
.collapsible__header span {
    color: #2e3440;
}
.collapsible__content {
    width: 30%;
}
.collapsible__content ul {
    list-style: none;
    padding: 0;
    margin-top: 0;
}
.collapsible__content.fixed ul {
    margin-top: 5px;
    margin-bottom: 0;
}
.collapsible__content li {
    color: #eceff4;
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 5px;
    background-color: #434c5e;
    box-shadow: 0 2px 10px #2e344077;
}
.collapsible__trigger {
    color: #2e3440;
    font-size: 20px;
    cursor: pointer;
}
</style>

<!--code start-->
<Collapsible.Container class="collapsible__container" slot="component">
    <div class="collapsible__header">
        <span>View all notifications</span>
        <Collapsible.Trigger class="collapsible__trigger">+</Collapsible.Trigger>
    </div>
    <div class="collapsible__content fixed">
        <ul>
            <li>Item 1</li>
        </ul>
    </div>
    <Collapsible.Content class="collapsible__content">
        <ul>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
    </Collapsible.Content>
</Collapsible.Container>
<!--code end-->

```svelte
<Collapsible.Container>
    <Collapsible.Trigger/>
    <Collapsible.Content/>
</Collapsible.Container>
```