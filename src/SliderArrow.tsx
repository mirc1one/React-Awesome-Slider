import React, { useEffect, useRef, useContext } from 'react';
import gsap from 'gsap';
import { SliderContext } from './utils';

interface Props {
    scrollNext: () => void;
}

const timeline = gsap.timeline();

const SliderArrow: React.FC<Props> = ({ scrollNext }) => {
    const ref = useRef<HTMLDivElement>(),
        svgRef = useRef<SVGSVGElement>(),
        circleRef = useRef<SVGCircleElement>(),
        {
            animationDuration,
            autoPlayInterval,
            activeSlide,
            allowedToScroll,
        } = useContext(SliderContext);

    // calculate the offset array, de pe stack overflow
    const calculateOffset = (t: number, c: number) => c - (c * t) / 100;

    useEffect(() => {
        const { current: arrow } = ref,
            { current: svg } = svgRef,
            { current: circle } = circleRef;

        if (svg && circle && arrow) {
            const circleRadius: number = parseInt(circle.getAttribute('r')),
                circleCircumference: number = parseFloat(
                    (circleRadius * Math.PI * 2).toFixed(2),
                );

            gsap.set(svg, {
                strokeDashoffset: circleCircumference,
            });

            gsap.set(circle, {
                attr: {
                    'stroke-dasharray': `${circleCircumference} ${circleCircumference}`,
                },
            });

            timeline.add(
                gsap.to(circle, {
                    strokeDashoffset: calculateOffset(100, circleCircumference),
                    duration: autoPlayInterval / 1000,
                    ease: 'steps(120)',
                }),
            );

            timeline.eventCallback('onComplete', function () {
                scrollNext();
                timeline.restart();
            });

            const handlePauseOnHover = () => timeline.pause();
            const handlePauseOnLeave = () => timeline.resume();

            arrow.addEventListener('mouseover', handlePauseOnHover);
            arrow.addEventListener('mouseleave', handlePauseOnLeave);

            return () => {
                arrow.removeEventListener('mouseover', handlePauseOnHover);
                arrow.removeEventListener('mouseleave', handlePauseOnLeave);
            };
        }
    }, []);

    useEffect(() => {
        if (timeline) {
            timeline.pause();

            setTimeout(() => {
                timeline.restart();
            }, animationDuration);
        }
    }, [activeSlide]);

    return (
        <div
            ref={ref as React.MutableRefObject<HTMLDivElement>}
            className="slider-arrow"
            onClick={() => allowedToScroll && scrollNext()}
        >
            <span className="progress">
                <svg ref={svgRef} viewBox="0 0 40 40">
                    <circle
                        ref={circleRef}
                        r="18"
                        cx="20"
                        cy="20"
                        fill="transparent"
                        stroke="#FFF"
                        strokeWidth="2"
                    ></circle>
                </svg>
            </span>
            <span className="arrow">
                <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                >
                    <path
                        fill="currentColor"
                        d="M252.485 343.03l-7.07-7.071c-4.686-4.686-12.284-4.686-16.971 0L145 419.887V44c0-6.627-5.373-12-12-12h-10c-6.627 0-12 5.373-12 12v375.887l-83.444-83.928c-4.686-4.686-12.284-4.686-16.971 0l-7.07 7.071c-4.686 4.686-4.686 12.284 0 16.97l116 116.485c4.686 4.686 12.284 4.686 16.971 0l116-116.485c4.686-4.686 4.686-12.284-.001-16.97z"
                    ></path>
                </svg>
            </span>
        </div>
    );
};

export default SliderArrow;
