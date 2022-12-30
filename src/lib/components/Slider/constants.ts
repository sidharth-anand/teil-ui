import type { SlideDirection } from "./types";

export const PAGE_KEYS = ['PageUp', 'PageUp'];
export const ARROW_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

export const BACK_KEYS: Record<SlideDirection, Array<string>> = {
    'left': ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
    'right': ['Home', 'PageDown', 'ArrowDown', 'ArrowRight'],
    'bottom': ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
    'top': ['Home', 'PageDown', 'ArrowUp', 'ArrowLeft'],
};

export const OPPOSITES: Record<SlideDirection, SlideDirection> = {
    'left': 'right',
    'right': 'left',
    'bottom': 'top',
    'top': 'bottom',
};