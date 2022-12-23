import Menu from '../Menu';

import Container from './Container.svelte';
import Content from './Content.svelte';
import Trigger from './Trigger.svelte';

const { Anchor, ...MenuExports } = Menu;

export default { ...MenuExports, Container, Content, Trigger };