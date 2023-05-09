export type Direction = 'ltr' | 'rtl';
export type Orientation = 'horizontal' | 'vertical';

export type SlideDirection = 'left' | 'right' | 'top' | 'bottom';

export type SliderStoreType = {
	disabled: boolean;
	orientation: Orientation;
	movement: SlideDirection;

	min: number;
	max: number;
	value: Array<number>;

	thumbs: Set<HTMLElement | null>;
	activeThumb: number;
};
