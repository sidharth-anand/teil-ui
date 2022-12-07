import { get } from "svelte/store";
import type { Writable } from "svelte/store";

import type { FocusStoreType } from "./types";

export function FocusGroup(node: HTMLElement, store: Writable<FocusStoreType>) {
    node.style.outline = 'none';

    node.addEventListener('focus', (event) => {
        if (event.target === event.currentTarget && !get(store).tabbingOut) {
            const activeItem = Array.from(get(store).state.entries()).find(
                ([, item]) => item.active
            );

            const activeIndex = activeItem ? activeItem[0] : get(store).items[0];

            store.update((state) => ({
                ...state,
                currentStopIndex: activeIndex,
            }));
        }
    });

    node.addEventListener('blur', () => {
        store.update(state => ({
            ...state,
            tabbingOut: false,
        }));
    });

    store.subscribe(state => {
        if (!state.forceFocusAll) {
            node.tabIndex = state.tabbingOut || state.items.length === 0 ? -1 : 0;
        }
    })
}