import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { PositionProps, PositionBreakpointProps } from './utils';
import { withAnimate } from './Animate';

interface Props {
    title: string;
    description?: string;
    link?: string;
    position: PositionBreakpointProps;
}

const ReactBreakLine = (text: string) => {
    return text.split('\\n').map((text: string, index: number) => {
        return <div key={index}>{text.trim()}</div>;
    });
};

const TitleDiv = styled.div`
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
const SlideTitle = forwardRef(
    ({ title, description, link, position }: Props, forwardedRef) => {
        return (
            <TitleDiv
                ref={forwardedRef as React.MutableRefObject<HTMLDivElement>}
                className="slide-title"
                {...position}
            >
                <h1>{ReactBreakLine(title)}</h1>
                {description && (
                    <div className="description">
                        {ReactBreakLine(description)}
                    </div>
                )}
                {link && (
                    <a href={link} target="_self">
                        Read more
                    </a>
                )}
            </TitleDiv>
        );
    },
);

export default withAnimate(SlideTitle, 'title');
