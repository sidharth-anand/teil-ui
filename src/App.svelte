<script lang="ts">
  import { slide } from "svelte/transition";

  import svelteLogo from "./assets/svelte.svg";
  import Counter from "./lib/Counter.svelte";

  import Accordion from "./lib/components/Accordion";
  import AspectRatio from "./lib/components/AspectRatio";
  import Checkbox from "./lib/components/Checkbox";
  import Collapsible from "./lib/components/Collapsible";
  import Switch from "./lib/components/Switch";
  import Radio from "./lib/components/Radio";
  import Popper from "./lib/components/Popper";
  import Menu from "./lib/components/Menu";
  import ContextMenu from "./lib/components/ContextMenu";
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src="/vite.svg" class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
    <Checkbox.Box>
      <Checkbox.Indicator>
        <svelte:fragment slot="checked">+</svelte:fragment>
        <svelte:fragment slot="unchecked">-</svelte:fragment>
      </Checkbox.Indicator>
    </Checkbox.Box>
    <Switch.Track class="switch__track">
      <Switch.Thumb class="switch__thumb" />
    </Switch.Track>
  </div>

  <Radio.Group class="radio__group">
    <Radio.Button class="radio__button" id="x" value="asd">
      <Radio.Indicator class="radio__indicator" />
    </Radio.Button>
    <Radio.Button class="radio__button" id="y" value="qwe">
      <Radio.Indicator class="radio__indicator" />
    </Radio.Button>
    <label htmlfor="x">ASD</label>
    <label htmlfor="y">QWE</label>
  </Radio.Group>

  <Accordion.Container class="accordion__container">
    <Accordion.Item class="accordion__item" value="item-1">
      <Accordion.Trigger class="accordion__trigger"
        >Is it accessible?</Accordion.Trigger
      >
      <Accordion.Content class="accordion__content">
        <div class="accordion__content__text" transition:slide>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div></Accordion.Content
      >
    </Accordion.Item>

    <Accordion.Item class="accordion__item" value="item-2">
      <Accordion.Trigger class="accordion__trigger"
        >Is it unstyled?</Accordion.Trigger
      >
      <Accordion.Content class="accordion__content">
        <div class="accordion__content__text" transition:slide>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>

    <Accordion.Item class="accordion__item" value="item-3">
      <Accordion.Trigger class="accordion__trigger"
        >Can it be animated?</Accordion.Trigger
      >
      <Accordion.Content class="accordion__content">
        <div class="accordion__content__text" transition:slide>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Container>

  <Collapsible.Container>
    <Collapsible.Trigger>+</Collapsible.Trigger>
    <Collapsible.Content>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </Collapsible.Content>
  </Collapsible.Container>

  <div class="img-container">
    <AspectRatio ratio={16 / 9}>
      <img
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
        alt="Landscape photograph by Tobias Tullius"
      />
    </AspectRatio>
  </div>

  <Popper.Container>
    <Popper.Anchor class="popper__anchor">
      <button>Click me</button>
    </Popper.Anchor>
    <Popper.Content class="popper__content" side="right" alignment="center">
      <div>Popper content</div>
      <Popper.Arrow class="popper__arrow" height={20} width={40} />
    </Popper.Content>
  </Popper.Container>

  <Menu.Container>
    <Menu.Anchor class="menu__anchor"><button>ASD</button></Menu.Anchor>
    <Menu.Content class="menu__content">
      <Popper.Arrow class="popper__arrow" height={10} width={20} />
      <Menu.Group>
        <Menu.Item><a>Item 1</a></Menu.Item>
        <Menu.Item><a>Item 2</a></Menu.Item>
        <Menu.Item><a>Item 3</a></Menu.Item>
        <Menu.Sub>
          <a slot="item">Submenu Item -&lt;</a>
          <Menu.Content slot="menu">
            <Popper.Arrow class="popper__arrow" height={10} width={20} />
            <Menu.Group>
              <Menu.Item><a>Submenu Item 1</a></Menu.Item>
              <Menu.Item><a>Submenu Item 2</a></Menu.Item>
              <Menu.Item><a>Submenu Item 3</a></Menu.Item>
            </Menu.Group>
          </Menu.Content>
        </Menu.Sub>
        <Menu.ItemCheck>
          Check Item
          <Menu.ItemIndicator>
            <svelte:fragment slot="checked">+</svelte:fragment>
          </Menu.ItemIndicator>
        </Menu.ItemCheck>
      </Menu.Group>
      <Menu.Label>Radio Group</Menu.Label>
      <Menu.RadioGroup>
        <Menu.ItemRadio value="a"><Menu.ItemIndicator>
          <svelte:fragment slot="checked">+</svelte:fragment>
        </Menu.ItemIndicator> Option A</Menu.ItemRadio>
        <Menu.ItemRadio value="b"><Menu.ItemIndicator>
          <svelte:fragment slot="checked">+</svelte:fragment>
        </Menu.ItemIndicator> Option B</Menu.ItemRadio>
        <Menu.ItemRadio value="c"><Menu.ItemIndicator>
          <svelte:fragment slot="checked">+</svelte:fragment>
        </Menu.ItemIndicator> Option C</Menu.ItemRadio>
      </Menu.RadioGroup>
    </Menu.Content>
  </Menu.Container>

  <ContextMenu.Container>
    <ContextMenu.Trigger class="contextmenu__area">
      Right click for context menu
    </ContextMenu.Trigger>
    <ContextMenu.Content>
      <ContextMenu.Item>
        <a>Item 1</a>
      </ContextMenu.Item>
      <ContextMenu.Item>
        <a>Item 2</a>
      </ContextMenu.Item>
      <ContextMenu.Item>
        <a>Item 3</a>
      </ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Container>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style global>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
  .img-container {
    width: 200px;
    overflow: hidden;
  }
  .img-container img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  :global(.switch__track) {
    width: 40px;
    height: 20px;
    border-radius: 15px;
    background-color: #ccc;
    display: flex;
    align-items: center;
    padding: 0;
  }
  :global(.switch__thumb) {
    background: red;
    width: 20px;
    height: 20px;
    border-radius: 15px;
    display: block;
  }
  :global(.switch__track[checked="true"] .switch__thumb) {
    background: green;
    transform: translateX(20px);
    transform-origin: center;
  }
  :global(.radio__button .radio__indicator) {
    width: 10px;
    height: 10px;
    display: inline-block;
    background: white;
  }
  :global(.radio__button[checked="true"] .radio__indicator) {
    background: green;
  }
  .accordion__container {
    border-radius: 6px;
    width: 300px;
    background-color: pink;
    box-shadow: 0 2px 10px black;
  }
  .accordion__item {
    overflow: hidden;
    margin-top: 1px;
  }

  .accordion__item:first-child {
    margin-top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .accordion__item:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .accordion__item:focus-within {
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 2px var(--mauve12);
  }

  .accordion__trigger {
    width: 100%;
    font-family: inherit;
    background-color: transparent;
    padding: 0 20px;
    height: 45px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    line-height: 1;
    color: violet;
    box-shadow: 0 1px 0 pink;
    background-color: white;
  }

  .accordion__trigger:hover {
    background-color: plum;
    color: white;
  }

  .accordion__content {
    overflow: hidden;
    font-size: 15px;
    color: plum;
    background-color: pink;
  }
  .accordion__content__text {
    padding: 15px 20px;
  }
  .popper__anchor button {
    width: 100%;
  }
  .popper__arrow {
    fill: green;
  }
  .menu__anchor {
    margin-bottom: 200px;
  }
  .contextmenu__area {
    display: block;
    border: 1px dashed white;
    text-align: center;
    padding: 25px 25px;
  }
</style>
