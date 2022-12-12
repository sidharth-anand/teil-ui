import type { Writable } from 'svelte/store';

import type { DismissableStoreType } from "./types";

export function DismissableBranch(node: HTMLElement, store: Writable<DismissableStoreType>) {
    store.update(state => ({
        ...state,
        branches: new Set([...state.branches, node])
    }));

    function destroy() {
        store.update(state => ({
            ...state,
            branches: new Set([...state.branches].filter(branch => branch !== node))
        }));
    }

    return {
        destroy
    };
}