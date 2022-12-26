export function debounce(fn: (...args: any[]) => void, delay: number) {
    let timeout: NodeJS.Timeout = null;

    return (...args: any[]) => {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(context, ...args), delay);
    };
}