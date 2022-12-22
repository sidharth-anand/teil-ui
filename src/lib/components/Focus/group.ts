import { get } from "svelte/store";
import type { Writable } from "svelte/store";

import type { FocusStoreType } from "./types";

export function FocusGroup(node: HTMLElement, store: Writable<FocusStoreType>) {
    node.addEventListener('focus', (event) => {
        if (event.target === event.currentTarget && !get(store).tabbingOut && (!get(store).forceFocusContainer || get(store).forceFocusFirst)) {
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

    if (get(store).blurContainerOnLeave) {
        node.addEventListener('pointerleave', (event) => {
            if (event.target === event.currentTarget) {
                store.update(state => ({
                    ...state,
                    currentStopIndex: undefined,
                }));

                if (get(store).focusContainerOnMount) {
                    node.focus();
                }
            }
        });
    }

    store.subscribe(state => {
        if (!state.forceFocusAll) {
            node.tabIndex = state.tabbingOut || state.items.length === 0 ? -1 : 0;
        }
    });

    node.style.outline = 'none';

    if (get(store).focusContainerOnMount) {
        node.tabIndex = 0;
        node.focus();
        node.tabIndex = get(store).tabbingOut || get(store).items.length === 0 ? -1 : 0;
    }
}