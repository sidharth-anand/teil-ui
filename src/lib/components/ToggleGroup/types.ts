export type Type = 'single' | 'multiple';

export type ToggleGroupStoreType = {
    value: string | string[];
    disabled: boolean;
    type: Type;
};