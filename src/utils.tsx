import { useEffect, useRef, createContext } from 'react';

export interface PositionProps {
    topPercent?: number;
    leftPercent?: number;
    rightPercent?: number;
    bottomPercent?: number;
}

export interface PositionBreakpointProps {
    [key: number]: PositionProps;
}

export interface AnimationProps {
    top: number;
    left: number;
    opacity: number;
}

interface ContextProps {
    slidesRef: HTMLElement[];
    previousSlide: number | null;
    activeSlide: number | null;
    animationDuration: number;
    autoPlayInterval: number;
    allowedToScroll: boolean;
}

export const usePrevious = (value: any): any => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export const SliderContext = createContext<ContextProps>({
    slidesRef: null,
    previousSlide: null,
    activeSlide: null,
    animationDuration: null,
    autoPlayInterval: null,
    allowedToScroll: null,
});
