import { useContext } from 'react';
import { SliderContext } from './utils';

export const useAnimate = (type: 'leave' | 'enter'): any => {
    const { slidesRef, previousSlide, activeSlide } = useContext(SliderContext);
    let slide;

    // extra check because it might come empty instances and will throw Symbol Iterator error
    try {
        if (type === 'enter') {
            slide = slidesRef.filter((_, index) => index === activeSlide)?.[0];
        } else if (type === 'leave') {
            slide = slidesRef.filter(
                (_, index) => index === previousSlide,
            )?.[0];
        }

        if (slide) {
            const [background, image, title] = Array.from(slide.children);

            return {
                background: background.getBoundingClientRect(),
                image: image.getBoundingClientRect(),
                title: title.getBoundingClientRect(),
            };
        }
    } catch ($e) {}

    return false;
};
