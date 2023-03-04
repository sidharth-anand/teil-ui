<script lang="ts">
	import '@fontsource/fira-mono/400.css';
	import '@fontsource/fira-mono/700.css';

	import '@fontsource/overpass/latin-100.css';
	import '@fontsource/overpass/latin-300.css';
	import '@fontsource/overpass/latin-400.css';
	import '@fontsource/overpass/latin-600.css';
	import '@fontsource/overpass/latin-700.css';

	import '@fontsource/roboto/latin-400.css';
	import '@fontsource/roboto/latin-400-italic.css';
	import '@fontsource/roboto/latin-500.css';
	import '@fontsource/roboto/latin-500-italic.css';

	// import '$styles/base.css';
	// import '$styles/theme.css';

	import '../scss/main.scss';

	import Icons from '$components/Icons.svelte';
</script>

<Icons />
<slot />
