import type { Writable } from 'svelte/store';

export type Direction = 'ltr' | 'rtl';

export type Point = {
    x: number;
    y: number;
};

export type Checked = boolean | 'indeterminate';

export type MenuStoreType = {
    open: boolean;
    modal: boolean;
    submenu: boolean;
    keyboard: boolean;
    direction: Direction;
    value: string;
};

export type SubmenuStoreType = {
    open: boolean;

    triggerID: string;
    contentID: string;

    trigger?: HTMLElement;
    content?: HTMLElement;

    refocus?: () => void;
    reset?: () => void;

    root: Writable<MenuStoreType>;
}

export type MenuItemIndicatorStoreType = {
    checked: Checked;
};