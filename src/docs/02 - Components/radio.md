---
  layout: component
  title: Radio Group
  description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
---

<script>
    import Radio from '$lib/components/Radio';
</script>

<style global>
.radio__group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.radio__item {
    display: flex;
    align-items: center;
}
.radio__button {
  background-color: #4c566a;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-shadow: 0 2px 10px #2e344077;
}
.radio__button:hover {
  background-color: #434c5e;
}
.radio__button:focus {
  box-shadow: 0 0 0 2px #81a1c1;
  outline: none;
}
.radio__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
}
.radio__button[aria-checked="true"] .radio__indicator::after {
  content: '';
  display: block;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #88c0d0;
}
.radio__label {
  color: #4c566a;
  font-size: 15px;
  line-height: 1;
  padding-left: 15px;
}
</style>

<!--code start-->
<Radio.Group class="radio__group" slot="component">
    <div class="radio__item">
        <Radio.Button class="radio__button" id="x" value="asd">
            <Radio.Indicator class="radio__indicator" />
        </Radio.Button> 
        <label class="radio__label" labelfor="x">Default</label>
    </div>
    <div class="radio__item">
        <Radio.Button class="radio__button" id="y" value="qwe">
            <Radio.Indicator class="radio__indicator" />
        </Radio.Button> 
        <label class="radio__label" labelfor="y">Comfortable</label>
    </div>
    <div class="radio__item">
        <Radio.Button class="radio__button" id="z" value="zxc">
            <Radio.Indicator class="radio__indicator" />
        </Radio.Button> 
        <label class="radio__label" labelfor="z">Compact</label>
    </div>
</Radio.Group>
<!--code end-->

```svelte
<Radio.Group>
    <Radio.Button>
        <Radio.Indicator />
    </Radio.Button>
</Radio.Group>
```