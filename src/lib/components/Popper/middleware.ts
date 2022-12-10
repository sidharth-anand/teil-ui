import type { Middleware, Placement } from "@floating-ui/core";

import type { Side, Alignment } from './types';

function getSideAndAlignFromPlacement(placement: Placement): readonly [Side, Alignment] {
    const [side, align = 'center'] = placement.split('-');
    return [side as Side, align as Alignment] as const;
}


export function transformOrigin(size: { width: number; height: number; }): Middleware {
    return {
        name: 'transformOrigin',
        options: {
            arrowWidth: size.width,
            arrowHeight: size.height,
        },
        fn(data) {
            const { placement, rects, middlewareData } = data;

            const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
            const isArrowHidden = cannotCenterArrow;
            const arrowWidth = isArrowHidden ? 0 : size.width;
            const arrowHeight = isArrowHidden ? 0 : size.height;

            const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
            const noArrowAlign = { start: '0%', center: '50%', end: '100%' }[placedAlign];

            const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
            const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;

            let x = '';
            let y = '';

            if (placedSide === 'bottom') {
                x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
                y = `${-arrowHeight}px`;
            } else if (placedSide === 'top') {
                x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
                y = `${rects.floating.height + arrowHeight}px`;
            } else if (placedSide === 'right') {
                x = `${-arrowHeight}px`;
                y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
            } else if (placedSide === 'left') {
                x = `${rects.floating.width + arrowHeight}px`;
                y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
            }

            return { data: { x, y } };
        }
    }
}