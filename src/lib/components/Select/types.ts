export type Direction = 'ltr' | 'rtl';

export type Position = {
    x: number;
    y: number;
};

export type SelectStoreType = {
    value: string;
    valuetext?: string;
    open: boolean;

    direction: Direction;
    disabled: boolean;
    required: boolean;
    autocomplete: boolean;

    triggerID: string;
    contentID: string;

    trigger?: HTMLElement | null;
    display?: HTMLElement | null;
    wrapper?: HTMLElement | null;
    content?: HTMLElement | null;
    viewport?: HTMLElement | null;
    selected?: HTMLElement | null;
    text?: HTMLElement | null;

    triggerPointerPosition?: Position;
    expandOnScroll?: boolean;
    positioned?: boolean;
};

export type SelectGroupStoreType = {
    id: string;
};

export type SelectItemStoreType = {
    value: string;
    id: string;
    disabled: boolean;
    selected: boolean;
};