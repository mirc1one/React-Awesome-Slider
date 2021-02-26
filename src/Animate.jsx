// this one file is a JSX because for the love of my life, couldn't
// make typescript work with a wrapped component with different prop types
// spend 2+ hrs on this and gave up (still learning ts :D)
import React, { useEffect, useState, createRef, useContext } from 'react';
import { useAnimate } from './useAnimate';
import gsap from 'gsap/all';
import { SliderContext } from './utils';

export const withAnimate = (WrappedComponent, type) => {
    // eslint-disable-next-line react/display-name
    return (props) => {
        const { animationDuration } = useContext(SliderContext);
        const [currentPosition, setCurrentPosition] = useState(null);
        const ref = createRef();
        const { animate, position } = props;

        const toValue = useAnimate('enter')?.[type];
        const fromValue = useAnimate('leave')?.[type];

        useEffect(() => {
            const { current } = ref;

            if (current && toValue && fromValue) {
                if (['enter', 'leave'].includes(animate)) {
                    const opacityEnter = animate === 'enter' ? 0 : 1,
                        opacityLeave = animate === 'enter' ? 1 : 0;

                    gsap.fromTo(
                        current,
                        {
                            opacity: opacityEnter,
                            top: fromValue.top,
                            left: fromValue.left,
                        },
                        {
                            opacity: opacityLeave,
                            top: toValue.top,
                            left: toValue.left,
                            duration: animationDuration / 1000,
                            ease: 'power1.inOut',
                        },
                    ).then(() => {
                        // remove the style added and return to its original position
                        current.removeAttribute('style');
                    });
                }
            }
        }, [animate]);

        useEffect(() => {
            const breakpointHandler = () => {
                let breakpointAt;

                for (const breakpoint of Object.keys(position).reverse()) {
                    if (breakpoint <= window.innerWidth) {
                        breakpointAt = breakpoint;

                        break;
                    }
                }

                if (breakpointAt) setCurrentPosition(position[breakpointAt]);
            };

            window.addEventListener('resize', breakpointHandler);
            window.dispatchEvent(new Event('resize'));

            return () => {
                window.removeEventListener('resize', breakpointHandler);
            };
        }, [window.innerWidth]);

        // actually rewrite the default position props
        // because we have the value in this hoc, and only pass the values
        // from the needed breakpoint on the styled component
        return (
            <WrappedComponent ref={ref} {...props} position={currentPosition} />
        );
    };
};
