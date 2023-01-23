import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
    return !param.includes('.') && !param.includes('/');
}) satisfies ParamMatcher;