import type { Writable } from "svelte/store";

export type Orientation = 'horizontal' | 'vertical' | 'both';
export type Direction = 'ltr' | 'rtl';

export type FocusIntent = 'first' | 'last' | 'next' | 'previous';

export type FocusItemState = {
    focusable: boolean;
    focused: boolean;
    active: boolean;
}

export type FocusStoreType = {
    orientation: Orientation;
    direction: Direction;
    loop: boolean;
    forceFocusAll: boolean;

    currentStopIndex?: number;
    tabbingOut: boolean;

    items: Array<number>;
    state: Map<number, FocusItemState>;

    shiftFocus: (intent: FocusIntent) => number;

    register: () => number;
    unregister: (index: number) => void;
};

export type FocusItemActionInput = {
    focusable?: boolean;
    active?: boolean;
    
    store: Writable<FocusStoreType>;
}