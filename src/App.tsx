import React, { useEffect } from 'react';
import Slider from './Slider';
import Slide from './Slide';
import SlideBackground from './SlideBackground';
import SliderImage from './SlideImage';
import SlideTitle from './SlideTitle';

function App(): JSX.Element {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.addEventListener('resize', () => {
            document.documentElement.style.height = document.body.style.height = `${window.innerHeight}px`;
            document.documentElement.style.width = document.body.style.width = `${window.innerWidth}px`;
        });
        window.dispatchEvent(new Event('resize'));
    }, []);

    const sliderDefaults = {
        startIndex: 0,
        animationDuration: 1000,
        autoPlayInterval: 6000,
    };

    return (
        <Slider {...sliderDefaults}>
            <Slide>
                <SlideBackground
                    url={'https://picsum.photos/id/1024/1200/600'}
                    position={{
                        0: {
                            topPercent: 7,
                            leftPercent: -50,
                        },
                        600: {
                            topPercent: 7,
                            leftPercent: -2,
                        },
                        1200: {
                            topPercent: 12,
                            leftPercent: 15,
                        },
                    }}
                />
                <SliderImage
                    url={'https://picsum.photos/id/1024/800/400'}
                    position={{
                        0: {
                            topPercent: 31,
                            leftPercent: -24,
                        },
                        600: {
                            topPercent: 30,
                            leftPercent: 4,
                        },
                        1200: {
                            topPercent: 30,
                            leftPercent: 45,
                        },
                    }}
                />
                <SlideTitle
                    title="I AM ERROR\n A Fullstack \nWebdeveloper"
                    description="Want to hire me? Contact me at \n mircea.bratu@icloud.com.\n Over 5 years of experience. \n Or click the link to checkout \n my portfolio."
                    link={'https://iamerror.ro/'}
                    position={{
                        0: {
                            topPercent: 52,
                            leftPercent: 20,
                        },
                        600: {
                            topPercent: 46,
                            leftPercent: 50,
                        },
                        1200: {
                            topPercent: 40,
                            leftPercent: 33,
                        },
                    }}
                />
            </Slide>

            <Slide>
                <SlideBackground
                    url={'https://picsum.photos/id/1031/1200/600'}
                    position={{
                        0: {
                            topPercent: 15,
                            leftPercent: 20,
                        },
                        600: {
                            topPercent: 15,
                            leftPercent: 20,
                        },
                        1200: {
                            topPercent: 25,
                            leftPercent: 20,
                        },
                    }}
                />
                <SliderImage
                    url={'https://picsum.photos/id/1031/800/400'}
                    position={{
                        0: {
                            topPercent: 27,
                            leftPercent: 11,
                        },
                        600: {
                            topPercent: 27,
                            leftPercent: 51,
                        },
                        1200: {
                            topPercent: 50,
                            leftPercent: 60,
                        },
                    }}
                />
                <SlideTitle
                    title="I like to build \n awesome stuff \n and play with animations"
                    description="Lorem ipsum dolor sit amet, \nconsectetur adipiscing elit. \nQuo modo autem philosophus loquitur? \nCum audissem Antiochum"
                    link={'https://google.ro/'}
                    position={{
                        0: {
                            topPercent: 44,
                            leftPercent: 23,
                        },
                        600: {
                            topPercent: 36,
                            leftPercent: 37,
                        },
                        1200: {
                            topPercent: 36,
                            leftPercent: 45,
                        },
                    }}
                />
            </Slide>

            <Slide>
                <SlideBackground
                    url={'https://picsum.photos/id/222/1200/600'}
                    position={{
                        0: {
                            topPercent: 19,
                            leftPercent: 7,
                        },
                        1200: { topPercent: 17, leftPercent: 10 },
                    }}
                />
                <SliderImage
                    url={'https://picsum.photos/id/222/800/400'}
                    position={{
                        0: {
                            topPercent: 39,
                            leftPercent: 18,
                        },
                        1200: {
                            topPercent: 23,
                            leftPercent: 18,
                        },
                    }}
                />
                <SlideTitle
                    title="I try to find\n some interesting titles \n for these..."
                    description="Tu enim ista lenius, hic Stoicorum more \n nos vexat. Aliter enim explicari, quod \n quaeritur, non potest. Id quaeris, inquam, \n in quo, utrum respondero, verses te huc \n atque illuc necesse est."
                    link={'https://google.ro/'}
                    position={{
                        0: {
                            topPercent: 48,
                            leftPercent: 3,
                        },
                        600: {
                            topPercent: 38,
                            leftPercent: 64,
                        },
                        1200: {
                            topPercent: 30,
                            leftPercent: 52,
                        },
                    }}
                />
            </Slide>

            <Slide>
                <SlideBackground
                    url={'https://picsum.photos/id/555/1200/600'}
                    position={{
                        0: {
                            topPercent: 32,
                            leftPercent: -40,
                        },
                        600: {
                            topPercent: 12,
                            leftPercent: 15,
                        },
                        1200: {
                            topPercent: 12,
                            leftPercent: 35,
                        },
                    }}
                />
                <SliderImage
                    url={'https://picsum.photos/id/555/800/400'}
                    position={{
                        0: {
                            topPercent: 30,
                            leftPercent: 10,
                        },
                        600: {
                            topPercent: 30,
                            leftPercent: 40,
                        },
                        1200: { topPercent: 22, leftPercent: 40 },
                    }}
                />
                <SlideTitle
                    title="I'm not the best copy \n so here goes the 4th \n title"
                    description="Tum ille timide vel potius \n verecunde: Facio, inquit. Quod non faceret, si in \n voluptate summum bonum poneret."
                    link={'https://google.ro/'}
                    position={{
                        0: {
                            topPercent: 46,
                            leftPercent: 20,
                        },
                        600: {
                            topPercent: 46,
                            leftPercent: 60,
                        },
                        1200: { topPercent: 50, leftPercent: 65 },
                    }}
                />
            </Slide>
        </Slider>
    );
}

export default App;
