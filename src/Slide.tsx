import React, { useEffect, useState } from 'react';
import { usePrevious } from './utils';
import styled from 'styled-components';

interface Props {
    active?: boolean;
    children: JSX.Element | JSX.Element[];
    index?: number;
}

const SlideDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
`;

// eslint-disable-next-line react/display-name
const Slide = React.forwardRef(
    ({ active, children, index }: Props, forwardedRef) => {
        const [isActive, setIsActive] = useState(active);
        const wasActive = usePrevious(isActive);

        useEffect(() => {
            setIsActive(active);
        }, [active]);

        return (
            <SlideDiv
                ref={forwardedRef as React.MutableRefObject<HTMLDivElement>}
                className={`slide ${
                    isActive ? 'is-active' : ''
                } slide-${index}`}
            >
                {React.Children.map(children, (child: JSX.Element) => {
                    const animate =
                        isActive && !wasActive
                            ? 'enter'
                            : !isActive && wasActive
                            ? 'leave'
                            : false;

                    return React.cloneElement(child, {
                        animate,
                    });
                })}
            </SlideDiv>
        );
    },
);

export default Slide;
