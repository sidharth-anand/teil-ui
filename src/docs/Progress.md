---
  title: Progress Bar
  description: Displays an indicator showing the completion progress of a task.
---

<script>
    import {onMount} from 'svelte';

    import Progress from '$lib/components/Progress';

    let value = 0;

    onMount(() => {
        setTimeout(() => value = 60, 250);
    });
</script>

<style global>
.progress__track {
    position: relative;
    overflow: hidden;
    background: #434c5e;
    width: 300px;
    height: 25px;
    transform: translateZ(0);
}

.progress__bar {
    background-color: #8fbcbb;
    opacity: 1;
    width: 100%;
    height: 100%;
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
}
</style>

<!--code start-->
<Progress.Track class="progress__track" {value} max={100} slot="component">
    <Progress.Bar class="progress__bar" style="transform: translateX(-{100 - value}%)" />
</Progress.Track>
<!--code end-->

```svelte
<Progress.Track>
    <Progress.Bar/>
</Progress.Track>
```