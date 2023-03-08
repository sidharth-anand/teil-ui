---
  layout: component
  title: AlertDialog
  description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
---

<script>
    import AlertDialog from '$lib/components/AlertDialog';
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
    z-index: 99;
}
.dialog__title {
    color: #2e3440;
}
.dialog__close {
    color: #bf616a;
}
</style>

<!--code start-->
<AlertDialog.Container modal slot="component">
    <AlertDialog.Trigger class="dialog__trigger">
        Open Alert Dialog
    </AlertDialog.Trigger>
    <AlertDialog.Overlay class="dialog__overlay" />
    <AlertDialog.Content class="dialog__content">
        <AlertDialog.Title class="dialog__title">Alert Dialog</AlertDialog.Title>
        <AlertDialog.Description>
            You can't close this dialog by clicking outside, you have to take an action.
            You can also press the escape key to exit.
        </AlertDialog.Description>
        <AlertDialog.Close class="dialog__close">Close</AlertDialog.Close>
    </AlertDialog.Content>
</AlertDialog.Container>
<!--code end-->

```svelte
<AlertDialog.Container>
    <AlertDialog.Trigger></AlertDialog.Trigger>
    <AlertDialog.Overlay></AlertDialog.Overlay>
    <AlertDialog.Content>
        <AlertDialog.Title></AlertDialog.Title>
        <AlertDialog.Description></AlertDialog.Description>
        <AlertDialog.Close></AlertDialog.Close>
    </AlertDialog.Content>
</AlertDialog.Container>
```