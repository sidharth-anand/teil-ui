import Menu from '../Menu';

import Trigger from './Trigger.svelte';

const { Anchor, ...MenuExports } = Menu;

export default { ...MenuExports, Trigger };