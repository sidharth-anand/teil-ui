---
  layout: component
  title: Slider
  description: An input where the user selects a value from within a given range.
---

<script>
    import Slider from '$lib/components/Slider';
</script>

<style global>
.slider__container {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: 200px;
}
.slider__container[aria-orientation='horizontal'] {
    height: 20px;
}
.slider__container[aria-orientation='vertical'] {
    flex-direction: column;
    width: 20px;
    height: 100px;
}
.slider__track {
    background-color: #434c5e;
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
}
.slider__track[aria-orientation='horizontal'] {
    height: 3px;
}
.slider__track[aria-orientation='vertical'] {
    width: 3px;
}
.slider__range {
    position: absolute;
    background-color: #bf616a;
    border-radius: 9999px;
    height: 100%;
}
.slider__thumb {
    display: block;
    width: 20px;
    height: 20px;
    background-color: white;
    box-shadow: 0 2px 10px #2e344044;
    border-radius: 10px;
}
.slider__thumb:hover {
    background-color: #bf616a;
}
.slider__thumb:focus {
    outline: none;
    box-shadow: 0 0 0 5px #2e344077;
}
</style>

<!--code start-->
<Slider.Container class="slider__container" value={[50]} slot="component">
    <Slider.Track class="slider__track">
        <Slider.Range class="slider__range" />
    </Slider.Track>
    <Slider.Thumb class="slider__thumb" />
</Slider.Container>
<!--code end-->

```svelte
<Slider.Container>
    <Slider.Track>
        <Slider.Range/>
    <Slider.Track>
    <Slider.Thumb/>
<Slider.Container>
```