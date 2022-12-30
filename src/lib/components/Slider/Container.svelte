<script lang="ts">
  import type {
    SliderStoreType,
    Direction,
    Orientation,
    SlideDirection,
  } from "./types";

  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import { CONTEXT } from "../../constants";
  import { getDecimalCount, roundValue, clamp, scale } from "../../math";

  import { PAGE_KEYS, ARROW_KEYS, BACK_KEYS } from "./constants";

  export let name: string = "";
  export let disabled: boolean = false;
  export let inverted: boolean = false;

  export let direction: Direction = "ltr";
  export let orientation: Orientation = "horizontal";

  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;
  export let minStepsBetweenHandles: number = 0;

  export let value: Array<number> = [];

  const sliderStore = writable<SliderStoreType>({
    disabled,
    orientation,
    movement: "left",

    min,
    max,
    value,

    thumbs: new Set<HTMLElement>(),
    activeThumb: 0,
  });

  let element: HTMLElement | null = null;

  $: slideDirection = (
    orientation === "horizontal"
      ? (direction === "ltr") !== inverted //!== instead of XOR because JS
        ? "left"
        : "right"
      : inverted
      ? "top"
      : "bottom"
  ) as SlideDirection;

  function getNextSortedValues(
    prevValues: number[] = [],
    nextValue: number,
    index: number
  ) {
    const nextValues = [...prevValues];
    nextValues[index] = nextValue;
    return nextValues.sort((a, b) => a - b);
  }

  function getStepsBetweenValues(values: number[]) {
    return values.slice(0, -1).map((value, index) => values[index + 1] - value);
  }

  function hasMinStepsBetweenValues(
    values: number[],
    minStepsBetweenValues: number
  ) {
    if (minStepsBetweenValues > 0) {
      const stepsBetweenValues = getStepsBetweenValues(values);
      const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
      return actualMinStepsBetweenValues >= minStepsBetweenValues;
    }
    return true;
  }

  function getValueFromPointer(position: number): number {
    if (!element) return 0;

    const rect = element?.getBoundingClientRect();

    const input: [number, number] = [0, rect.width];
    const output: [number, number] =
      slideDirection === "left" || slideDirection === "top"
        ? [min, max]
        : [max, min];

    return scale(
      input,
      output
    )(position - (orientation === "horizontal" ? rect.left : rect.top));
  }

  function getClosestIndex(values: Array<number>, target: number): number {
    if (values.length === 1) return 0;

    const distances = values.map((value) => Math.abs(value - target));
    return distances.indexOf(Math.min(...distances));
  }

  function getPointerPosition(event: PointerEvent): number {
    return orientation === "horizontal" ? event.clientX : event.clientY;
  }

  function update(value: number, index: number) {
    const decimal = getDecimalCount(step);
    const snap = roundValue(
      Math.round((value - min) / step) * step + min,
      decimal
    );
    const next = clamp([min, max], snap);

    const values = getNextSortedValues($sliderStore.value, next, index);

    if (hasMinStepsBetweenValues(values, minStepsBetweenHandles * step)) {
      const active = values.indexOf(next);
      const changed = String(values) !== String($sliderStore.value);

      if (changed) {
        sliderStore.update((state) => {
          return {
            ...state,
            value: values,
            activeThumb: active,
          };
        });
      }
    }
  }

  function skip(event: KeyboardEvent, direction: 1 | -1) {
    const page = PAGE_KEYS.includes(event.key);
    const skip = page || (event.shiftKey && ARROW_KEYS.includes(event.key));
    const multiplier = skip ? 10 : 1;

    const index = $sliderStore.activeThumb;
    const value = $sliderStore.value[index];
    const shift = step * direction * multiplier;

    update(value + shift, index);
  }

  function slidestart(event: PointerEvent) {
    if (disabled) return;

    const value = getValueFromPointer(getPointerPosition(event));
    const index = getClosestIndex($sliderStore.value, value);

    update(value, index);
  }

  function slidemove(event: PointerEvent) {
    if (disabled) return;

    update(
      getValueFromPointer(getPointerPosition(event)),
      $sliderStore.activeThumb
    );
  }

  function keydown(event: KeyboardEvent) {
    if (!disabled) {
      if (event.key === "Home") {
        update(min, 0);
        event.preventDefault();
      } else if (event.key === "End") {
        update(max, $sliderStore.value.length - 1);
        event.preventDefault();
      } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
        event.preventDefault();
        skip(event, BACK_KEYS[slideDirection].includes(event.key) ? -1 : 1);
      }
    }
  }

  function pointerdown(event: PointerEvent) {
    const target = event.target as HTMLElement;

    target.setPointerCapture(event.pointerId);
    event.preventDefault();

    if ($sliderStore.thumbs.has(target)) {
      target.focus();
    } else {
      slidestart(event);
    }
  }

  function pointermove(event: PointerEvent) {
    if ((event.target as HTMLElement).hasPointerCapture(event.pointerId)) {
      slidemove(event);
    }
  }

  function pointerup(event: PointerEvent) {
    const target = event.target as HTMLElement;

    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
      event.preventDefault();
    }
  }

  //TODO: Check if part of form to add native control

  setContext(CONTEXT.SLIDER, sliderStore);

  $: {
    sliderStore.update((state) => ({
      ...state,
      movement: slideDirection,
    }));
  }
</script>

<span
  bind:this={element}
  class={$$props.class}
  style="--slider-thumb-transform: translate{orientation === 'horizontal'
    ? 'X'
    : 'Y'}(-50%)"
  aria-disabled={disabled}
  aria-orientation={orientation}
  on:keydown={keydown}
  on:pointerdown={pointerdown}
  on:pointermove={pointermove}
  on:pointerup={pointerup}
>
  <slot />
</span>
