---
  title: Accordion
  description: A set of vertically stacked headings that each reveal an associated section of content.
---

<script>
    import {slide} from 'svelte/transition';

    import Accordion from '$lib/components/Accordion';
</script>

<style global>
.accordion__container {
    width: 300px;
    background-color: #3b4252;
    box-shadow: 0 2px 10px #2e344077;
  }
.accordion__item {
  overflow: hidden;
  margin-top: 1px;
}

.accordion__item:first-child {
  margin-top: 0;
}

.accordion__item:focus-within {
  position: relative;
  z-index: 1;
}

.accordion__trigger {
  width: 100%;
  font-family: inherit;
  background-color: transparent;
  padding: 0 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  line-height: 1;
  color: #eceff4;
  box-shadow: 0 1px 0 pink;
  background-color: #4c566a;
}

.accordion__trigger[aria-expanded="true"] {
  font-weight: bold;
  color: #88c0d0;
}

.accordion__trigger:hover {
  background-color: #88c0d0;
  color: #4c566a;
}

.accordion__content {
  overflow: hidden;
  font-size: 15px;
  color: #eceff4;
  background-color: #3b4252;
}
.accordion__content__text {
  padding: 15px 20px;
}
</style>

<!--code start-->
<Accordion.Container class="accordion__container" slot="component">
  <Accordion.Item class="accordion__item" value="item-1">
    <Accordion.Trigger class="accordion__trigger">
      Is it accessible?
    </Accordion.Trigger>
    <Accordion.Content class="accordion__content">
      <div class="accordion__content__text" transition:slide>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </div>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item class="accordion__item" value="item-2">
    <Accordion.Trigger class="accordion__trigger">
      Is it unstyled?
    </Accordion.Trigger>
    <Accordion.Content class="accordion__content">
      <div class="accordion__content__text" transition:slide>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </div>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item class="accordion__item" value="item-3">
    <Accordion.Trigger class="accordion__trigger">
      Can it be animated?
    </Accordion.Trigger>
    <Accordion.Content class="accordion__content">
      <div class="accordion__content__text" transition:slide>
        Yes! You can animate the Accordion with CSS or JavaScript.
      </div>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Container>
<!--code end-->

```svelte
<Accordion.Container />
```
