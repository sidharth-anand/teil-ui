import { initialize, search, lookup } from './search';

addEventListener('message', async (event) => {
	const { type, payload } = event.data;

	if (type === 'init') {
		const res = await fetch(
			`${payload.origin}${import.meta.env.PROD ? '/teil-ui' : ''}/search.json`
		);
		const { blocks } = await res.json();

		initialize(blocks);

		postMessage({ type: 'ready' });
	} else if (type === 'query') {
		const query = payload;
		const results = search(query);

		postMessage({ type: 'results', payload: { results, query } });
	} else if (type === 'recents') {
		const results = payload.map(lookup).filter(Boolean);

		postMessage({ type: 'recents', payload: results });
	}
});
