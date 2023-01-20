import type { Writable } from 'svelte/store';
import type { DismissableStoreType } from './types';

import { writable } from 'svelte/store';

export function createDismissableContext(): Writable<DismissableStoreType> {
	return writable({
		layers: new Set<HTMLElement>(),
		pointerDisabled: new Set<HTMLElement>(),
		branches: new Set<HTMLElement>()
	});
}
