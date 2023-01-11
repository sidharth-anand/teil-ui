import type { Writable } from "svelte/store";

export type Orientation = 'horizontal' | 'vertical' | 'both';
export type Direction = 'ltr' | 'rtl';

export type FocusIntent = 'first' | 'last' | 'next' | 'previous';

export type FocusItemState = {
    focusable: boolean;
    focused: boolean;
    active: boolean;

    node: HTMLElement;
}

export type FocusStoreType = {
    orientation: Orientation;
    direction: Direction;
    loop: boolean;

    forceFocusAll: boolean;
    forceFocusContainer: boolean;
    forceFocusFirst: boolean;
    
    disableTabbing: boolean;
    focusContainerOnMount: boolean;
    blurContainerOnLeave: boolean;

    currentStopIndex?: number;
    tabbingOut: boolean;

    items: Array<number>;
    state: Map<number, FocusItemState>;

    getFocusIntent?: (event: KeyboardEvent) => FocusIntent;

    shiftFocus: (intent: FocusIntent) => number;

    register: () => number;
    unregister: (index: number) => void;
};

export type FocusContextOptions = {
    orientation: Orientation;
    direction: Direction;
    loop: boolean;

    forceFocusAll?: boolean;
    forceFocusContainer?: boolean;
    forceFocusFirst?: boolean;
    
    disableTabbing?: boolean;
    focusContainerOnMount?: boolean;
    blurContainerOnLeave?: boolean;

    getFocusIntent?: (event: KeyboardEvent) => FocusIntent;
};

export type FocusItemActionInput = {
    focusable?: boolean;
    focused?: boolean;
    active?: boolean;

    store: Writable<FocusStoreType>;
}