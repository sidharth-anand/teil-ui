---
  title: Dialog
  description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
---

<script>
    import Dialog from '$lib/components/Dialog';
</script>

<style global>
.dialog__trigger {
    background-color: #2e3440;
    color: #88c0d0;
    padding: 15px 30px;
    border-radius: 2px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 2px 10px #2e344099;
}
.dialog__trigger:hover {
    background-color: #88c0d0;
    color: #2e3440;
}
.dialog__overlay {
    background-color: black;
    opacity: 0.3;
    position: fixed;
    inset: 0;
}
.dialog__content {
    background-color: #eceff4;
    border-radius: 2px;
    box-shadow: #2e344055 0px 10px 38px -10px,
        #3b425233 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    color: #4c566a;
}
.dialog__title {
    color: #2e3440;
}
.dialog__close {
    color: #bf616a;
}
</style>

<!--code start-->
<Dialog.Container modal slot="component">
    <Dialog.Trigger class="dialog__trigger">
        Open Dialog
    </Dialog.Trigger>
    <Dialog.Overlay class="dialog__overlay" />
    <Dialog.Content class="dialog__content">
        <Dialog.Title class="dialog__title">Dialog Title</Dialog.Title>
        <Dialog.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum, nisl nec
            tincidunt lacinia, tortor nisl aliquam tortor, eget aliquam nisl nunc vel lorem. Sed
            euismod, nisl non aliquam tincidunt, nisl nunc aliquam tortor, eget aliquam nisl
            nunc vel lorem.
        </Dialog.Description>
        <Dialog.Close class="dialog__close">Close</Dialog.Close>
    </Dialog.Content>
</Dialog.Container>
<!--code end-->

```svelte
<Dialog.Container>
    <Dialog.Trigger></Dialog.Trigger>
    <Dialog.Overlay></Dialog.Overlay>
    <Dialog.Content>
        <Dialog.Title></Dialog.Title>
        <Dialog.Description></Dialog.Description>
        <Dialog.Close></Dialog.Close>
    </Dialog.Content>
</Dialog.Container>
```