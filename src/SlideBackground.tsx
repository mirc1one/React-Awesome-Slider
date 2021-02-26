import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { PositionProps, PositionBreakpointProps } from './utils';
import { withAnimate } from './Animate';

interface Props {
    url: string;
    position: PositionBreakpointProps;
}

const BackgroundDiv = styled.div`
    top: ${(props: PositionProps) =>
        props.topPercent ? `${props.topPercent}%` : `auto`};
    left: ${(props: PositionProps) =>
        props.leftPercent ? `${props.leftPercent}%` : `auto`};
    right: ${(props: PositionProps) =>
        props.rightPercent ? `${props.rightPercent}%` : `auto`};
    bottom: ${(props: PositionProps) =>
        props.bottomPercent ? `${props.bottomPercent}%` : `auto`};
`;

// eslint-disable-next-line react/display-name
const SlideBackground = forwardRef(({ url, position }: Props, forwardedRef) => {
    return (
        <BackgroundDiv
            ref={forwardedRef as React.MutableRefObject<HTMLDivElement>}
            className="slide-background"
            {...position}
        >
            <img src={url} />
        </BackgroundDiv>
    );
});

export default withAnimate(SlideBackground, 'background');
