import { get } from 'svelte/store';

import type {
	FocusIntent,
	FocusItemActionInput,
	FocusItemState,
	Direction,
	Orientation
} from './types';

const KeyFocusMap: Record<string, FocusIntent> = {
	ArrowLeft: 'previous',
	ArrowUp: 'previous',
	ArrowRight: 'next',
	ArrowDown: 'next',
	PageUp: 'first',
	Home: 'first',
	PageDown: 'last',
	End: 'last'
};

function getDirectionAwareKey(key: string, direction: Direction): string {
	if (direction !== 'rtl') {
		return key;
	}

	return key === 'ArrowLeft' ? 'ArrowRight' : key === 'ArrowRight' ? 'ArrowLeft' : key;
}

function getFocusIntent(
	event: KeyboardEvent,
	direction: Direction,
	orientation: Orientation
): FocusIntent | undefined {
	const key = getDirectionAwareKey(event.key, direction);

	if (orientation === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(key)) {
		return undefined;
	} else if (orientation === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(key)) {
		return undefined;
	} else {
		return KeyFocusMap[key];
	}
}

function sortItems(indices: Array<number>, states: Map<number, FocusItemState>): Array<number> {
	return indices.sort(
		(a, b) =>
			states.get(a).node.compareDocumentPosition(states.get(b).node) &
			Node.DOCUMENT_POSITION_PRECEDING
	);
}

export function FocusItem(node: HTMLElement, input: FocusItemActionInput) {
	const store = input.store;

	const index = get(store).register();

	get(store).state.set(index, {
		focusable: input.focusable ?? true,
		focused: false,
		active: input.active ?? false,
		node
	});

	store.update((state) => ({
		...state,
		items: sortItems(state.items, state.state)
	}));

	node.addEventListener('mousedown', (event) => {
		if (!get(store).state.get(index).focusable) {
			event.preventDefault();
		}

		store.update((state) => ({
			...state,
			currentStopIndex: index
		}));
	});

	node.addEventListener('keydown', (event) => {
		if (get(store).disableTabbing && event.key === 'Tab') {
			event.preventDefault();
			return;
		}

		if (event.key === 'Tab' && event.shiftKey) {
			store.update((state) => ({
				...state,
				tabbingOut: true
			}));
			return;
		}

		if (event.target !== event.currentTarget) {
			return;
		}

		const intent = get(store).getFocusIntent
			? get(store).getFocusIntent(event)
			: getFocusIntent(event, get(store).direction, get(store).orientation);

		if (intent) {
			event.preventDefault();
			get(store).shiftFocus(intent);
		}
	});

	store.subscribe((state) => {
		if (!state.forceFocusAll) {
			node.tabIndex = state.currentStopIndex === index ? 0 : -1;
		} else if (state.forceFocusContainer && state.forceFocusAll) {
			node.tabIndex = 0;
		}

		if (state.currentStopIndex === index) {
			node.focus();
		} else {
			node.blur();
		}
	});

	return {
		update: (input: FocusItemActionInput) => {
			if (input.focused && input.focused !== get(store).state.get(index).focused) {
				store.update((state) => ({
					...state,
					currentStopIndex: index
				}));
			}

			get(store).state.set(index, {
				focusable: input.focusable ?? true,
				focused: input.focused ?? false,
				active: input.active ?? false,
				node
			});
		},
		destroy: () => {
			get(store).unregister(index);
			get(store).state.delete(index);
		}
	};
}
