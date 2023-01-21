import { writable } from 'svelte/store';

function storable<T>(key: string, fallback?: T) {
    try {
        let value: T = key in localStorage ? JSON.parse(localStorage.getItem(key)!) : fallback;

        const store = writable<T>(value);

        const set = (nv: T) => {
            store.set(nv);
            localStorage[key] = nv;
        }

        return {
            subscribe: store.subscribe,
            set,
            update: (fn: (v: T) => T) => set(fn(value))
        }
    } catch {
        return writable<T>(fallback);
    }
}

export const searching = writable<boolean>(false);
export const query = writable<string>('');
export const recent = storable<Array<string>>('recent', []);