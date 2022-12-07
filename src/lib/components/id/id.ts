const prefix = 'id:'
let index = 0;

export function id() {
    return `${prefix}${index++}`;
}