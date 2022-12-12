import type { DismissableLayerActionOptions, DismissableStoreType } from "./types";

import { createEventDispatcher } from "svelte";
import { get } from 'svelte/store';

type DismissableLayerEventTypes = {
    escape: KeyboardEvent;
    pointerDownOutside: PointerEvent;
    focusOutside: FocusEvent;
    interactOutside: PointerEvent | FocusEvent;
    dismiss: void;
};

let DocumentPointerEvents: string = "";

//TODO: add support for multiple independent dismissable layers
//Should be as simple as moving the store to a global store?

export function DismissableLayer(node: HTMLElement, options: DismissableLayerActionOptions) {
    const store = options.store;

    let disableOutsidePointerEvents = options.disableOutsidePointerEvents ?? false;

    const dispatch = createEventDispatcher<DismissableLayerEventTypes>();

    let pointerInside = false;
    let focusInside = false;

    let layers: Array<HTMLElement>;

    let highestDisabledLayer: HTMLElement;
    let highestDisabledLayerIndex: number;

    let index: number;
    let highestLayer: boolean;

    let bodyPointerEventsDisabled: boolean;
    let pointerEventsEnabled: boolean;

    function init(state: DismissableStoreType) {
        layers = [...state.layers];

        [highestDisabledLayer] = [...state.pointerDisabled].slice(-1);
        highestDisabledLayerIndex = layers.indexOf(highestDisabledLayer);

        index = layers.indexOf(node);
        highestLayer = index === layers.length - 1;

        bodyPointerEventsDisabled = state.pointerDisabled.size > 0;
        pointerEventsEnabled = index >= highestDisabledLayerIndex;

        node.style.pointerEvents = bodyPointerEventsDisabled ? pointerEventsEnabled ? 'auto' : 'none' : undefined;
    }

    function changePointerStyle() {
        if (disableOutsidePointerEvents) {
            if (get(store).pointerDisabled.size === 0) {
                DocumentPointerEvents = document.body.style.pointerEvents;
                document.body.style.pointerEvents = "none";
            }

            store.update(state => ({
                ...state,
                pointerDisabled: new Set([...state.pointerDisabled, node]),
            }));
        }
    }

    function outsideEvent(event: PointerEvent | FocusEvent) {
        const isBranch = [...get(store).branches].some((branch) =>
            branch.contains(event.target as HTMLElement)
        );

        if (!pointerEventsEnabled || isBranch) {
            return;
        }

        if (event instanceof PointerEvent) {
            dispatch("pointerDownOutside", event, {
                cancelable: true,
            });
        } else {
            dispatch("focusOutside", event, {
                cancelable: true,
            });
        }

        dispatch("interactOutside", event, {
            cancelable: true,
        });

        if (!event.defaultPrevented) {
            dispatch("dismiss");
        }
    }

    function pointerDown(event: PointerEvent) {
        if (event.target && !pointerInside) {
            const dispatchEvent = () => outsideEvent(event);

            if (event.pointerType === "touch") {
                document.removeEventListener("click", dispatchEvent);
                document.addEventListener("click", dispatchEvent, { once: true });
            } else {
                dispatchEvent();
            }

            pointerInside = false;
        }
    }

    function focusOutside(event: FocusEvent) {
        if (event.target && !focusInside) {
            outsideEvent(event);
            focusInside = false;
        }
    }

    function keypress(event: KeyboardEvent) {
        if (event.key === "Escape" && highestLayer) {
            dispatch("escape", event);

            if (!event.defaultPrevented) {
                dispatch("dismiss");
            }
        }
    }

    function update(newOptions: DismissableLayerActionOptions) {
        disableOutsidePointerEvents = newOptions.disableOutsidePointerEvents ?? false;
        changePointerStyle();
    }

    function destroy() {
        if (disableOutsidePointerEvents && get(store).pointerDisabled.size === 1) {
            document.body.style.pointerEvents = DocumentPointerEvents;
        }

        store.update(state => {
            const layers = new Set(state.layers);
            const pointerDisabled = new Set(state.pointerDisabled);

            layers.delete(node);
            pointerDisabled.delete(node);

            return {
                ...state,
                layers,
                pointerDisabled,
            };
        });

        document.removeEventListener('pointerdown', pointerDown);
        document.removeEventListener('focusin', focusOutside);
        document.removeEventListener('keypress', keypress);
    }

    store.subscribe(state => init(state));

    document.addEventListener('pointerdown', pointerDown);
    document.addEventListener('focusin', focusOutside);
    document.addEventListener('keypress', keypress);

    return {
        update,
        destroy
    };
}