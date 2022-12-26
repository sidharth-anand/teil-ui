<script lang="ts">
  import type { Writable } from "svelte/store";

  import type {
    ScrollStoreType,
    Orientation,
    Direction,
    ScrollbarSizes,
  } from "../types";

  import { hasContext, getContext, onMount, onDestroy } from "svelte";

  import { CONTEXT } from "../../../constants";
  import { debounce } from "../../../debounce";

  export let orientation: Orientation;

  if (!hasContext(CONTEXT.SCROLL)) {
    throw new Error("Scroll.Bar must be used inside a Scroll.Area");
  }

  const scrollStore = getContext<Writable<ScrollStoreType>>(CONTEXT.SCROLL);

  const resizeObserver = new ResizeObserver(debounce(resize, 10));

  let sizes: ScrollbarSizes = {
    content: 0,
    viewport: 0,

    scrollbar: {
      size: 0,

      paddingStart: 0,
      paddingEnd: 0,
    },
  };

  let element: HTMLElement | null = null;
  let pointerOffset: number = 0;
  let dragging = false;

  //Fuck Apple and Safari for dumb event handling
  let webkitUserSelection: string = "";

  $: thumbRatio = getThumbRatio(sizes.viewport, sizes.content);
  $: maxScroll = sizes.content - sizes.viewport;
  $: horizontal = orientation === "horizontal";
  $: scrollDirection = horizontal ? "scrollLeft" : "scrollTop";

  function clamp(range: readonly [number, number], value: number): number {
    return Math.min(Math.max(range[0], value), range[1]);
  }

  function scale(
    input: readonly [number, number],
    output: readonly [number, number]
  ): (value: number) => number {
    return (value: number) => {
      if (input[0] === input[1] || output[0] === output[1]) {
        return output[0];
      }

      const ratio = (output[1] - output[0]) / (input[1] - input[0]);
      return output[0] + ratio * (value - input[0]);
    };
  }

  function getThumbRatio(viewport: number, content: number) {
    const ratio = viewport / content;
    return isNaN(ratio) ? 0 : ratio;
  }

  function getThumbSize(size: ScrollbarSizes) {
    const ratio = getThumbRatio(size.viewport, size.content);
    const scrollbarPadding =
      size.scrollbar.paddingStart + size.scrollbar.paddingEnd;
    const thumbSize = size.scrollbar.size * ratio - scrollbarPadding;

    // Fuck MacOS for 18px restriction
    return Math.max(thumbSize, 18);
  }

  function getThumbOffsetFromScroll(
    position: number,
    size: ScrollbarSizes,
    direction: Direction = "ltr"
  ) {
    const thumbSize = getThumbSize(size);
    const scrollbarPadding =
      size.scrollbar.paddingStart + size.scrollbar.paddingEnd;
    const scrollbar = size.scrollbar.size - scrollbarPadding;

    const maxScrollPosition = size.content - size.viewport;
    const maxThumbPosition = scrollbar - thumbSize;

    const scrollClampRange =
      direction === "ltr"
        ? [0, maxScrollPosition]
        : [maxScrollPosition * -1, 0];
    const scrollWithoutMomentum = clamp(
      scrollClampRange as [number, number],
      position
    );

    return scale(
      [0, maxScrollPosition],
      [0, maxThumbPosition]
    )(scrollWithoutMomentum);
  }

  function getScrollPositionFromPointer(
    position: number,
    pointerOffset: number,
    size: ScrollbarSizes,
    direction: Direction = "ltr"
  ) {
    const thumb = getThumbSize(size);
    const center = thumb / 2;

    const offset = pointerOffset || center;
    const endOffset = thumb - offset;

    const minPointerPosition = size.scrollbar.paddingStart + offset;
    const maxPointerPosition =
      size.scrollbar.size - sizes.scrollbar.paddingEnd - endOffset;

    const maxScrollPosition = size.content - size.viewport;
    const scrollRange =
      direction === "ltr"
        ? [0, maxScrollPosition]
        : [maxScrollPosition * -1, 0];

    return scale(
      [minPointerPosition, maxPointerPosition],
      scrollRange as [number, number]
    )(position);
  }

  function isScrollingWithinBounds(position: number, max: number): boolean {
    return position > 0 && position < max;
  }

  function wheelscroll(event: WheelEvent) {
    if (!$scrollStore.area?.contains(event.target as HTMLElement)) return;

    if ($scrollStore.viewport) {
      const position = horizontal
        ? $scrollStore.viewport.scrollLeft + event.deltaX
        : $scrollStore.viewport.scrollTop + event.deltaY;

      $scrollStore.viewport[scrollDirection] = position;

      if (isScrollingWithinBounds(position, maxScroll)) {
        event.preventDefault();
      }
    }
  }

  function dragscroll(event: PointerEvent) {
    const x = event.clientX - $scrollStore.area.getBoundingClientRect().left;
    const y = event.clientY - $scrollStore.area.getBoundingClientRect().top;

    const position = horizontal ? x : y;

    if ($scrollStore.viewport) {
      $scrollStore.viewport[scrollDirection] = getScrollPositionFromPointer(
        position,
        pointerOffset,
        sizes,
        horizontal ? $scrollStore.direction : "ltr"
      );
    }
  }

  function pointerdown(event: PointerEvent) {
    if (event.button === 0) {
      (event.target as HTMLElement).setPointerCapture(event.pointerId);

      webkitUserSelection = document.body.style.userSelect;
      document.body.style.webkitUserSelect = "none";

      dragging = true;

      dragscroll(event);
    }
  }

  function pointermove(event: PointerEvent) {
    if (dragging) {
      dragscroll(event);
    }
  }

  function pointerup(event: PointerEvent) {
    const target = event.target as HTMLElement;

    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }

    document.body.style.webkitUserSelect = webkitUserSelection;

    dragging = false;
  }

  function resize() {
    if (element && $scrollStore.viewport) {
      sizes = {
        content: horizontal
          ? $scrollStore.viewport.scrollWidth
          : $scrollStore.viewport.scrollHeight,
        viewport: horizontal
          ? $scrollStore.viewport.offsetWidth
          : $scrollStore.viewport.offsetHeight,
        scrollbar: {
          size: horizontal ? element.offsetWidth : element.offsetHeight,
          paddingStart: horizontal
            ? parseInt(getComputedStyle(element).paddingLeft)
            : parseInt(getComputedStyle(element).paddingTop),
          paddingEnd: horizontal
            ? parseInt(getComputedStyle(element).paddingRight)
            : parseInt(getComputedStyle(element).paddingBottom),
        },
      };
    }
  }

  function thumbpositionchange() {
    if ($scrollStore.viewport && $scrollStore.thumb) {
      const position = $scrollStore.viewport[scrollDirection];
      const offset = getThumbOffsetFromScroll(
        position,
        sizes,
        horizontal ? $scrollStore.direction : "ltr"
      );

      $scrollStore.thumb.style.transform = `translate3d(${
        horizontal ? offset : 0
      }px, ${horizontal ? 0 : offset}px, 0)`;
    }
  }

  function thumbpointerup() {
    pointerOffset = 0;
  }

  function thumbpointerdown(position: { x: number; y: number }) {
    if (horizontal) {
      pointerOffset = position.x;
    } else {
      pointerOffset = position.y;
    }
  }

  onMount(() => {
    document.addEventListener("wheel", wheelscroll, { passive: false });

    resizeObserver.observe($scrollStore.area);
    resizeObserver.observe($scrollStore.content);
  });

  onDestroy(() => {
    document.removeEventListener("wheel", wheelscroll);

    resizeObserver.disconnect();
  });

  scrollStore.update((state) => ({
    ...state,
    thumbpositionchange,
    thumbpointerdown,
    thumbpointerup,
  }));

  $: {
    scrollStore.update((state) => ({
      ...state,
      enableThumb: thumbRatio > 0 && thumbRatio < 1,
    }));
  }

  $: {
    sizes;
    thumbpositionchange();
  }

  $: {
    if (element) {
      if (horizontal) {
        scrollStore.update((state) => ({
          ...state,
          horizontal: element,
        }));
      } else {
        scrollStore.update((state) => ({
          ...state,
          vertical: element,
        }));
      }
    }
  }
</script>

<div
  bind:this={element}
  class={$$props.class}
  style="
    position: absolute;
    top: {horizontal ? undefined : 0};
    bottom: {horizontal ? 0 : `${$scrollStore.corner.height}px`};
    left: {horizontal
    ? $scrollStore.direction === 'rtl'
      ? `${$scrollStore.corner.width}px`
      : 0
    : $scrollStore.direction === 'rtl'
    ? 0
    : undefined};
    right: {horizontal
    ? $scrollStore.direction === 'ltr'
      ? `${$scrollStore.corner.width}px`
      : 0
    : $scrollStore.direction === 'ltr'
    ? 0
    : undefined};
    --scroll-area-thumb-{horizontal ? 'width' : 'height'}: {getThumbSize(
    sizes
  )}px;
  "
  data-orientation={orientation}
  on:pointerdown={pointerdown}
  on:pointermove={pointermove}
  on:pointerup={pointerup}
>
  <slot />
</div>
