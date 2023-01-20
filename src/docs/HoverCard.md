---
  title: Hover Card
  description: For sighted users to preview content behind a link.
---

<script>
    import HoverCard from '$lib/components/HoverCard';
</script>

<style global>
.hovercard__content {
  border-radius: 6px;
  padding: 20px;
  width: 300px;
  background-color: #3b4252;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 999;
}
.hovercard__content[data-side='top'] {
  animation-name: slideDownAndFade;
}
.hovercard__content[data-side='right'] {
  animation-name: slideLeftAndFade;
}
.hovercard__content[data-side='bottom'] {
  animation-name: slideUpAndFade;
}
.hovercard__content[data-side='left'] {
  animation-name: slideRightAndFade;
}

.HoverCardArrow {
  fill: #3b4252;
}

.ImageTrigger {
  cursor: pointer;
  border-radius: 100%;
  display: inline-block;
  padding: 5px;
  background: #3b4252;
  box-shadow: 0 2px 10px #2e344077;
}
.ImageTrigger:focus {
  box-shadow: 0 0 0 2px white;
}

.Image {
  display: block;
  border-radius: 100%;
}
.Image.normal {
  width: 45px;
  height: 45px;
}
.Image.large {
  width: 60px;
  height: 60px;
}

.Text {
  margin: 0;
  color: #eceff4;
  font-size: 15px;
  line-height: 1.5;
}
.Text.faded {
  color: #4c566a;
}
.Text.bold {
  font-weight: 500;
}
</style>

<!--code start-->
<HoverCard.Container slot="component">
    <HoverCard.Trigger>
        <a
        class="ImageTrigger"
        href="https://github.com/sidharth-anand"
        target="_blank"
        rel="noreferrer noopener"
        >
            <img
                class="Image normal"
                src="https://api.dicebear.com/5.x/adventurer/svg?seed=Cuddles"
                alt="Radix UI"
            />
        </a>
    </HoverCard.Trigger>
    <HoverCard.Content class="hovercard__content" >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <img
            class="Image large"
            src="https://api.dicebear.com/5.x/adventurer/svg?seed=Cuddles"
            alt="Radix UI"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div>
                    <div class="Text bold">Lorem</div>
                    <div class="Text faded">@imsup_do</div>
                </div>
                <div class="Text">
                    Components, icons, colors, and templates for building high-quality, accessible UI.
                    Free and open-source.
                </div>
                <div style={{ display: 'flex', gap: 15 }}>
                    <div style={{ display: 'flex', gap: 5 }}>
                    <div class="Text bold">0</div> <div class="Text faded">sit amet</div>
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                    <div class="Text bold">2,900</div> <div class="Text faded">consectetur adipiscing </div>
                    </div>
                </div>
            </div>
        </div>
        <HoverCard.Arrow class="HoverCardArrow" />
    </HoverCard.Content>
</HoverCard.Container>
<!--code end-->

```svelte
<HoverCard.Container>
    <HoverCard.Trigger/>
    <HoverCard.Content>
        <HoverCard.Arrow/>
    <HoverCard.Content>
</HoverCard.Container>
```