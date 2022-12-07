import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";

import type { Direction, FocusIntent, FocusStoreType, Orientation } from "./types";

const register = (items: Array<number>): number => {
    return items.push(items.length + 1);
};

const unregister = (items: Array<number>, index: number): void => {
    items.splice(
        items.findIndex((item) => item === index),
        1
    );
};

const shiftFocus = (items: Array<number>, intent: FocusIntent, loop: boolean, focusStore: Writable<FocusStoreType>): number => {
    if (!get(focusStore).currentStopIndex) {
        if (!items.length) {
            return;
        } else {
            focusStore.update((state) => ({
                ...state,
                currentStopIndex: items[0],
            }));
        }
    }

    const focusable = Array.from(get(focusStore).state.entries())
        .filter(([, item]) => item.focusable)
        .map(([index]) => index);

    const currentIndex = focusable.findIndex(
        (index) => index === get(focusStore).currentStopIndex
    );

    let nextIndex = currentIndex;

    if (intent === "previous") {
        nextIndex = loop
            ? (currentIndex - 1 + focusable.length) % focusable.length
            : Math.max(0, currentIndex - 1);
    } else if (intent === "next") {
        nextIndex = loop
            ? (currentIndex + 1 + focusable.length) % focusable.length
            : Math.min(focusable.length - 1, currentIndex + 1);
    } else if (intent === "first") {
        nextIndex = 0;
    } else if (intent === "last") {
        nextIndex = focusable.length - 1;
    }

    setTimeout(() => {
        focusStore.update((state) => ({
            ...state,
            currentStopIndex: focusable[nextIndex],
        }));
    });

    return focusable[nextIndex];
};

export function createFocusContext(orientation: Orientation, direction: Direction, loop: boolean, forceFocusAll: boolean = false) {
    const items: Array<number> = [];

    const focusStore: Writable<FocusStoreType> = writable({
        orientation,
        direction,
        loop,
        forceFocusAll,

        tabbingOut: false,

        items,
        state: new Map(),

        shiftFocus: (intent: FocusIntent) => shiftFocus(items, intent, loop, focusStore),

        register: () => register(items),
        unregister: (index: number) => unregister(items, index),
    });

    return focusStore;
}