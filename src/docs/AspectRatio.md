---
  title: Aspect Ratio
  description: A simple utility component to maintain aspect ratio of an element.
---

<script>
    import AspectRatio from '$lib/components/AspectRatio';
</script>

<style global>
.img-container {
    width: 200px;
    overflow: hidden;
    box-shadow: 0 2px 10px #2e344077;
}
.img-container img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>

<!--code start-->
<div class="img-container" slot="component">
    <AspectRatio ratio={16 / 9}>
        <img
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape photograph by Tobias Tullius"
        />
    </AspectRatio>
</div>
<!--code end-->

```svelte
<AspectRatio>
</AspectRatio>
```