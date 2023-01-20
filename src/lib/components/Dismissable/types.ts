import type { Writable } from 'svelte/store';

export type DismissableStoreType = {
	layers: Set<HTMLElement>;
	pointerDisabled: Set<HTMLElement>;
	branches: Set<HTMLElement>;
};

export type DismissableLayerActionOptions = {
	store: Writable<DismissableStoreType>;
	disableOutsidePointerEvents?: boolean;
};
