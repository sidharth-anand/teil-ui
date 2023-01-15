<script lang="ts">
  import type { Writable } from "svelte/store";

  import type { SliderStoreType } from "./types";

  import { hasContext, getContext, onMount, onDestroy } from "svelte";

  import { CONTEXT } from "../../constants";
  import { scale } from "../../math";

  export let label: string = "";

  if (!hasContext(CONTEXT.SLIDER)) {
    throw new Error("Slider.Range must be used inside a Slider.Container");
  }

  const sliderStore = getContext<Writable<SliderStoreType>>(CONTEXT.SLIDER);

  let element: HTMLElement | null = null;
  let observer: ResizeObserver | null = null;
  let rect: { width: number; height: number } | null = null;

  $: index = Array.from($sliderStore.thumbs).indexOf(element!);
  $: value = $sliderStore.value[index] as number | undefined;
  $: percentage =
    (100 / ($sliderStore.max - $sliderStore.min)) *
    (value ?? 0 - $sliderStore.min);

  $: size =
    $sliderStore.orientation === "horizontal" ? rect?.width : rect?.height;
  $: offset = size
    ? thumbOffset(
        size,
        percentage,
        $sliderStore.movement === "left" || $sliderStore.movement === "top"
          ? 1
          : -1
      )
    : 0;

  $: computedLabel = label || computeLabel(index, $sliderStore.value.length);

  function initObserver(): ResizeObserver {
    return new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) {
        return;
      }

      if (entries.length === 0) {
        return;
      }

      const entry = entries[0];

      let width: number;
      let height: number;

      if ("borderBoxSize" in entry!) {
        const borderSize = Array.isArray(entry.borderBoxSize)
          ? entry.borderBoxSize[0]
          : entry.borderBoxSize;

        width = borderSize.inlineSize;
        height = borderSize.blockSize;
      } else {
        width = element?.offsetWidth ?? 0;
        height = element?.offsetHeight ?? 0;
      }

      rect = { width, height };
    });
  }

  function computeLabel(index: number, count: number): string | undefined {
    if (count > 2) {
      return `Value ${index + 1} of ${count}`;
    } else if (count === 2) {
      return ["Minimum", "Maximum"][index];
    } else {
      return undefined;
    }
  }

  function thumbOffset(width: number, left: number, direction: -1 | 1) {
    const halfWidth = width / 2;
    const offset = scale([0, 50], [0, halfWidth])(left);
    console.log(offset);

    return (halfWidth - offset * direction) * direction;
  }

  function focus() {
    sliderStore.update((state) => ({
      ...state,
      activeThumb: index,
    }));
  }

  onMount(() => {
    sliderStore.update((state) => ({
      ...state,
      thumbs: new Set([...state.thumbs, element]),
    }));

    if (
      $sliderStore.value.length <=
      Array.from($sliderStore.thumbs).indexOf(element)
    ) {
      sliderStore.update((state) => ({
        ...state,
        value: [...state.value, 0],
      }));
    }

    observer = initObserver();

    observer.observe(element!);
  });

  onDestroy(() => {
    sliderStore.update((state) => ({
      ...state,
      thumbs: new Set([...state.thumbs].filter((thumb) => thumb !== element)),
    }));

    observer?.disconnect();
  });
</script>

<span
  style="
  position: absolute;
  transform: var(--slider-thumb-transform);
  {$sliderStore.movement}: calc({percentage}% + {offset}px);
"
>
  <span
    bind:this={element}
    role="slider"
    style={value === undefined ? "display: none" : ""}
    class={$$props.class}
    aria-label={computedLabel}
    aria-valuemin={$sliderStore.min}
    aria-valuemax={$sliderStore.max}
    aria-valuenow={value}
    aria-orientation={$sliderStore.orientation}
    aria-disabled={$sliderStore.disabled}
    tabindex={$sliderStore.disabled ? null : 0}
    on:focus={focus}
  />
</span>
