export type Activation = 'automatic' | 'manual';
export type Orientation = 'horizontal' | 'vertical';
export type Direction = 'ltr' | 'rtl';

export type TabsStoreType = {
    id: string;

    value: string;
    orientation: Orientation;
    direction: Direction;
    activation: Activation;
};