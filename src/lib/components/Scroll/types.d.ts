export type Direction = 'ltr' | 'rtl';
export type Orientation = 'vertical' | 'horizontal';
export type ScrollType = 'auto' | 'always' | 'scroll' | 'hover';

export type Size = {
	width: number;
	height: number;
};

export type ScrollbarSizes = {
	content: number;
	viewport: number;

	scrollbar: {
		size: number;

		paddingStart: number;
		paddingEnd: number;
	};
};

export type ScrollStoreType = {
	type: ScrollType;
	direction: Direction;
	delay: number;

	area: HTMLElement | null;
	viewport: HTMLElement | null;
	content: HTMLElement | null;
	vertical: HTMLElement | null;
	horizontal: HTMLElement | null;
	thumb: HTMLElement | null;

	enableThumb: boolean;
	enableX: boolean;
	enableY: boolean;

	thumbpositionchange?: () => void;
	thumbpointerdown?: (position: { x: number; y: number }) => void;
	thumbpointerup?: () => void;

	corner: Size;
};
