import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { PositionProps, PositionBreakpointProps } from './utils';
import { withAnimate } from './Animate.jsx';

interface Props {
    url: string;
    position: PositionBreakpointProps;
}

const ImageDiv = styled.div`
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
const SlideImage = forwardRef(({ url, position }: Props, forwardedRef) => {
    return (
        <ImageDiv
            ref={forwardedRef as React.MutableRefObject<HTMLDivElement>}
            className="slide-image"
            {...position}
        >
            <img src={url} />
        </ImageDiv>
    );
});

export default withAnimate(SlideImage, 'image');
