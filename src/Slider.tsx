import React, { Component, createRef } from 'react';
import SliderArrow from './SliderArrow';
import { SliderContext } from './utils';

interface Props {
    children: JSX.Element | JSX.Element[];
    startIndex?: number;
    animationDuration: number;
    autoPlayInterval: number;
}

type State = {
    animationDuration: number | unknown;
    previousSlide: number | null;
    activeSlide: number;
    autoPlayInterval: number;
    allowedToScroll: boolean;
};

class Slider extends Component<Props, State> {
    private sliderRef = createRef<HTMLDivElement>();
    private slidesRef: HTMLElement[] = null;
    public slidesCount: number;

    constructor(props: Props) {
        super(props);

        this.slidesCount = React.Children.count(props.children);
        this.slidesRef = new Array(this.slidesCount).fill(createRef());
    }

    state: State = {
        animationDuration: this.props.animationDuration ?? 1000,
        previousSlide: null,
        activeSlide: this.props.startIndex ?? 0,
        autoPlayInterval: this.props.autoPlayInterval ?? 5000,
        allowedToScroll: true,
    };

    componentDidMount(): void {
        if (this.sliderRef.current) {
            window.addEventListener(
                'mousewheel',
                this.changeOnScroll as EventListener,
            );
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State): void {
        // add a time delay in order to not match the exact animation with the setState&setTimeout because
        // it might have some ms time delay and cause flickers
        const timeout: number = (this.state.animationDuration as number) + 250;

        if (prevState.allowedToScroll && !this.state.allowedToScroll) {
            setTimeout(() => {
                this.setState({
                    allowedToScroll: true,
                });
            }, timeout);
        }
    }

    componentWillUnmount(): void {
        window.removeEventListener(
            'mousewheel',
            this.changeOnScroll as EventListener,
        );
    }

    handlePrev = (): void => {
        if (this.state.activeSlide > 0) {
            this.setState({
                previousSlide: this.state.activeSlide,
                activeSlide: this.state.activeSlide - 1,
                allowedToScroll: false,
            });
        } else {
            this.setState({
                previousSlide: this.state.activeSlide,
                activeSlide: this.slidesCount - 1,
                allowedToScroll: false,
            });
        }
    };

    handleNext = (): void => {
        if (this.state.activeSlide < this.slidesCount - 1) {
            this.setState({
                previousSlide: this.state.activeSlide,
                activeSlide: this.state.activeSlide + 1,
                allowedToScroll: false,
            });
        } else {
            this.setState({
                previousSlide: this.state.activeSlide,
                activeSlide: 0,
                allowedToScroll: false,
            });
        }
    };

    changeOnScroll = (event: WheelEvent): void => {
        const { deltaY } = event,
            direction = deltaY <= 0 ? 'up' : 'down';

        if (this.state.allowedToScroll) {
            if (direction === 'up') {
                this.handlePrev();
            } else {
                this.handleNext();
            }
        }
    };

    render(): JSX.Element {
        return (
            <div className="Slider" ref={this.sliderRef}>
                <SliderContext.Provider
                    value={{
                        slidesRef: this.slidesRef,
                        previousSlide: this.state.previousSlide,
                        activeSlide: this.state.activeSlide,
                        animationDuration: this.state
                            .animationDuration as number,
                        autoPlayInterval: this.state.autoPlayInterval,
                        allowedToScroll: this.state.allowedToScroll,
                    }}
                >
                    {React.Children.map(
                        this.props.children,
                        (child: JSX.Element, index: number) => {
                            return React.cloneElement(child, {
                                ref: (instance: HTMLElement) => {
                                    this.slidesRef[index] = instance;
                                },
                                active:
                                    this.state.activeSlide === index
                                        ? true
                                        : false,
                                index: index,
                            });
                        },
                    )}

                    <SliderArrow scrollNext={this.handleNext} />
                </SliderContext.Provider>
            </div>
        );
    }
}

export default Slider;
