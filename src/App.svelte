<script lang="ts">
  import { slide } from "svelte/transition";

  import svelteLogo from "./assets/svelte.svg";

  import Accordion from "./lib/components/Accordion";
  import AspectRatio from "./lib/components/AspectRatio";
  import Checkbox from "./lib/components/Checkbox";
  import Collapsible from "./lib/components/Collapsible";
  import Switch from "./lib/components/Switch";
  import Radio from "./lib/components/Radio";
  import Popper from "./lib/components/Popper";
  import Menu from "./lib/components/Menu";
  import ContextMenu from "./lib/components/ContextMenu";
  import Dialog from "./lib/components/Dialog";
  import DropdownMenu from "./lib/components/DropdownMenu";
  import HoverCard from "./lib/components/HoverCard";
  import Progress from "./lib/components/Progress";
  import Scroll from "./lib/components/Scroll";
  import Slider from "./lib/components/Slider";
  import Toggle from './lib/components/Toggle';
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
        <Menu.ItemRadio value="a"
          ><Menu.ItemIndicator>
            <svelte:fragment slot="checked">+</svelte:fragment>
          </Menu.ItemIndicator> Option A</Menu.ItemRadio
        >
        <Menu.ItemRadio value="b"
          ><Menu.ItemIndicator>
            <svelte:fragment slot="checked">+</svelte:fragment>
          </Menu.ItemIndicator> Option B</Menu.ItemRadio
        >
        <Menu.ItemRadio value="c"
          ><Menu.ItemIndicator>
            <svelte:fragment slot="checked">+</svelte:fragment>
          </Menu.ItemIndicator> Option C</Menu.ItemRadio
        >
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

  <Dialog.Container modal>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Dialog.Overlay class="dialog__overlay" />
    <Dialog.Content class="dialog__content">
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        condimentum, nisl nec tincidunt lacinia, tortor nisl aliquam tortor,
        eget aliquam nisl nunc vel lorem. Sed euismod, nisl non aliquam
        tincidunt, nisl nunc aliquam tortor, eget aliquam nisl nunc vel lorem.
      </Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Container>

  <DropdownMenu.Container>
    <DropdownMenu.Trigger>Dropdown</DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item>
        <a>Item 1</a>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a>Item 2</a>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <a>Item 3</a>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Container>

  <HoverCard.Container>
    <HoverCard.Trigger>+</HoverCard.Trigger>
    <HoverCard.Content>Preview Content</HoverCard.Content>
  </HoverCard.Container>

  <Progress.Track class="progress__track" value={60} max={100}>
    <Progress.Bar class="progress__bar" />
  </Progress.Track>

  <Scroll.Area type="hover" class="scroll__area">
    <Scroll.Viewport class="scroll__viewport">
      <div>
        <div class="scroll__viewport-heading">Tags</div>
        {#each Array(100) as _, i}
          <div class="scroll__viewport-item">Item {i}</div>
        {/each}
      </div>
    </Scroll.Viewport>
    <Scroll.Bar class="scroll__bar">
      <Scroll.Thumb class="scroll__thumb" />
    </Scroll.Bar>
  </Scroll.Area>

  <Slider.Container class="slider__container" value={[50]}>
    <Slider.Track class="slider__track">
      <Slider.Range class="slider__range" />
    </Slider.Track>
    <Slider.Thumb class="slider__thumb" />
  </Slider.Container>

  <Toggle class="toggle">I</Toggle>

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

  .dialog__overlay {
    background-color: darkgray;
    opacity: 0.3;
    position: fixed;
    inset: 0;
  }

  .dialog__content {
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    color: black;
  }
  .progress__track {
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.44);
    border-radius: 99999px;
    width: 300px;
    height: 25px;
    transform: translateZ(0);
  }

  .progress__bar {
    background-color: white;
    width: 100%;
    height: 100%;
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
    transform: translateX(-40%);
  }

  .scroll__area {
    width: 200px;
    height: 225px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.44);
    background-color: white;
    --scrollbar-size: 5px;
  }

  .scroll__viewport {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .scroll__bar {
    display: flex;
    user-select: none;
    touch-action: none;
    padding-top: 10px;
    padding-bottom: 5px;
    background: rgba(0, 0, 0, 0.44);
    transition: background 160ms ease-out;
  }
  .scroll__bar:hover {
    background: var(--blackA8);
  }
  .scroll__bar[data-orientation="vertical"] {
    width: var(--scrollbar-size);
  }
  .scroll__bar[data-orientation="horizontal"] {
    flex-direction: column;
    height: var(--scrollbar-size);
  }

  .scroll__thumb {
    flex: 1;
    background: mediumslateblue;
    border-radius: var(--scrollbar-size);
    position: relative;
  }
  /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  .scroll__thumb::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }

  .scroll__viewport-heading {
    color: violet;
    font-size: 15px;
    line-height: 18px;
    font-weight: 500;
  }

  .scroll__viewport-item {
    color: mediumslateblue;
    font-size: 13px;
    line-height: 18px;
    margin-top: 10px;
    border-top: 1px solid pink;
    padding-top: 10px;
  }

  .slider__container {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: 200px;
  }
  .slider__container[aria-orientation="horizontal"] {
    height: 20px;
  }
  .slider__container[aria-orientation="vertical"] {
    flex-direction: column;
    width: 20px;
    height: 100px;
  }

  .slider__track {
    background-color: white;
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
  }
  .slider__track[aria-orientation="horizontal"] {
    height: 3px;
  }
  .slider__track[aria-orientation="vertical"] {
    width: 3px;
  }

  .slider__range {
    position: absolute;
    background-color: white;
    border-radius: 9999px;
    height: 100%;
  }

  .slider__thumb {
    display: block;
    width: 20px;
    height: 20px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.44);
    border-radius: 10px;
  }
  .slider__thumb:hover {
    background-color: violet;
  }
  .slider__thumb:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.88);
  }

  .toggle {
  background-color: white;
  color: pink;
  height: 35px;
  width: 35px;
  border-radius: 4px;
  display: flex;
  font-size: 15px;
  line-height: 1;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px black;
}
.toggle:hover {
  background-color: violet;
}
.toggle[aria-pressed='true'] {
  background-color: palevioletred;
  color: white;
}
.toggle:focus {
  box-shadow: 0 0 0 2px black;
}

</style>
