import type { Writable } from 'svelte/store';

import type { ReferenceAction } from "svelte-floating-ui";

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';
export type Sticky = 'partial' | 'always';

export type Position = {
    x: number | null;
    y: number | null;
};

export type Boundary = Element | null;

export interface Measurable {
    getBoundingClientRect: () => DOMRect;
}

export type PopperStoreType = {
    initialized?: boolean;
    anchor?: Measurable;
    side?: Side;
    reference?: ReferenceAction;
    arrowStore?: Writable<HTMLElement | null>;
};