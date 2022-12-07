import { get } from "svelte/store";

import type { FocusIntent, FocusItemActionInput, Direction, Orientation } from "./types";

const KeyFocusMap: Record<string, FocusIntent> = {
    ArrowLeft: "previous",
    ArrowUp: "previous",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last",
};

function getDirectionAwareKey(key: string, direction: Direction): string {
    if (direction !== "rtl") {
        return key;
    }

    return key === "ArrowLeft"
        ? "ArrowRight"
        : key === "ArrowRight"
            ? "ArrowLeft"
            : key;
}

function getFocusIntent(event: KeyboardEvent, direction: Direction, orientation: Orientation): FocusIntent | undefined {
    const key = getDirectionAwareKey(event.key, direction);

    if (
        orientation === "vertical" &&
        ["ArrowLeft", "ArrowRight"].includes(key)
    ) {
        return undefined;
    } else if (
        orientation === "horizontal" &&
        ["ArrowUp", "ArrowDown"].includes(key)
    ) {
        return undefined;
    } else {
        return KeyFocusMap[key];
    }
}

export function FocusItem(node: HTMLElement, input: FocusItemActionInput) {
    const store = input.store;

    const index = get(store).register();

    get(store).state.set(index, {
        focusable: input.focusable ?? true,
        focused: false,
        active: input.active ?? false,
    });

    node.addEventListener('mousedown', (event) => {
        if (!get(store).state.get(index).focusable) {
            event.preventDefault();
        }

        store.update(state => ({
            ...state,
            currentStopIndex: index
        }));
    });

    node.addEventListener('keydown', (event) => {
        if (event.key === 'Tab' && event.shiftKey) {
            store.update(state => ({
                ...state,
                tabbingOut: true,
            }));
            return;
        }

        if (event.target !== event.currentTarget) {
            return;
        }

        const intent = getFocusIntent(event, get(store).direction, get(store).orientation);

        if (intent) {
            event.preventDefault();
            get(store).shiftFocus(intent);
        }
    })

    store.subscribe(state => {
        if (!state.forceFocusAll) {
            node.tabIndex = state.currentStopIndex === index ? 0 : -1;
        }

        if (state.currentStopIndex === index) {
            node.focus();
        } else {
            node.blur();
        }
    })

    return {
        update: (input: FocusItemActionInput) => {
            get(store).state.set(index, {
                focusable: input.focusable ?? true,
                focused: false,
                active: input.active ?? false,
            });
        },
        destroy: () => {
            get(store).unregister(index);
            get(store).state.delete(index);
        }
    }
}