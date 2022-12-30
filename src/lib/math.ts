export function getDecimalCount(value: number) {
    return (String(value).split(".")[1] || "").length;
}

export function roundValue(value: number, decimalCount: number) {
    const rounder = Math.pow(10, decimalCount);
    return Math.round(value * rounder) / rounder;
}

export function clamp(range: readonly [number, number], value: number): number {
    return Math.min(Math.max(range[0], value), range[1]);
}

export function scale(
    input: readonly [number, number],
    output: readonly [number, number]
): (value: number) => number {
    return (value: number) => {
        if (input[0] === input[1] || output[0] === output[1]) {
            return output[0];
        }

        const ratio = (output[1] - output[0]) / (input[1] - input[0]);
        return output[0] + ratio * (value - input[0]);
    };
}