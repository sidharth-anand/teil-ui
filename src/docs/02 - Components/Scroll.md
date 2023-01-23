---
  layout: component
  title: Scroll Area
  description: Augments native scroll functionality for custom, cross-browser styling.
---

<script>
    import Scroll from '$lib/components/Scroll';
</script>

<style global>
.scroll__area {
    width: 200px;
    height: 225px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 2px 10px #2e344077;
    background-color: #4c566a;
    --scrollbar-size: 5px;
}
.scroll__viewport {
    width: 100%;
    height: 100%;
    border-radius: inherit;
}
.scroll__viewport > div {
    padding: 15px 20px;
}
.scroll__bar {
    display: flex;
    user-select: none;
    touch-action: none;
    padding-top: 10px;
    padding-bottom: 5px;
    background: #2e3440;
    transition: background 160ms ease-out;
}
.scroll__bar:hover {
    background: #3b4252;
}
.scroll__bar[data-orientation='vertical'] {
    width: var(--scrollbar-size);
}
.scroll__bar[data-orientation='horizontal'] {
    flex-direction: column;
    height: var(--scrollbar-size);
}

.scroll__thumb {
    flex: 1;
    background: #88c0d0;
    border-radius: var(--scrollbar-size);
    position: relative;
}
.scroll__thumb::before {
    content: '';
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
    color: #eceff4;
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
}

.scroll__viewport-item {
    color: #a3be8c;
    font-size: 13px;
    line-height: 18px;
    margin-top: 10px;
    border-top: 1px solid #d8dee9;
    padding-top: 10px;
}
</style>

<!--code start-->
<Scroll.Area type="hover" class="scroll__area" slot="component">
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
<!--code end-->