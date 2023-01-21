import type { Handle } from '@sveltejs/kit';

const preload = ['js', 'css', 'font'];

export const handle = (({ event, resolve }) => {
    return resolve(event, {
        preload: ({ type }) => preload.includes(type)
    });
}) satisfies Handle;