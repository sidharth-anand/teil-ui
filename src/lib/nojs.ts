//Disables native form controls if js is enabled on browser
export function NoJS(node: HTMLElement) {
    node.style.opacity = "0";
    node.style.margin = "0";
    node.style.pointerEvents = "none";
}