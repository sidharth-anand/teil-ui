import type { Direction } from "./types";

export const SELECTION_KEYS = ["Enter", " "];
export const NAVIGATION_UP_KEYS = ["ArrowUp", "PageUp", "Home"];
export const NAVIGATION_DOWN_KEYS = ["ArrowDown", "PageDown", "End"];
export const NAVIGATION_KEYS = [...NAVIGATION_UP_KEYS, ...NAVIGATION_DOWN_KEYS];

export const SUBMENU_OPEN_KEYS: Record<Direction, Array<string>> = {
    ltr: [...SELECTION_KEYS, 'ArrowRight'],
    rtl: [...SELECTION_KEYS, 'ArrowLeft']
};
export const SUBMENU_CLOSE_KEYS: Record<Direction, Array<string>> = {
    ltr: ['ArrowLeft'],
    rtl: ['ArrowRight']
};