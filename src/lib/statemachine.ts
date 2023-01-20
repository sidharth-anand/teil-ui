import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any
	? R
	: never;

type Machine<S> = { [k: string]: { [k: string]: S } };
type State<T> = keyof T;
type Event<T> = keyof UnionToIntersection<T[keyof T]>;

export class StateMachine<M> {
	public state: Writable<State<M>> = null;

	constructor(state: State<M>, private machine: M & Machine<State<M>>) {
		this.state = writable<State<M>>(state);
	}

	public step(event: Event<M>): void {
		//TODO: Fix types here
		this.state.update((state) => (this.machine[state] as any)[event] ?? state);
	}
}
