import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
    AccordionHeader, AccordionPanel, mergeClasses, Subtitle1
} from '@fluentui/react-components';

import { EMPTY_STRING } from '../../common/helpers/Constants';
import DisplayCard from '../displayCard/DisplayCard';
import { useStyles } from './CardCarousel.styles';
import { CardCarouselHeader } from './CardCarouselHeader';
import { CardCarouselProps } from './CardCarouselProps';

export const CardCarousel: React.FC<CardCarouselProps> = ({
    headerTitle,
    headerTitleClassname,
    typeIsAccordion = false,
    cards,
    cardIsImage = false,
    carouselClassname,
    searchQuery = EMPTY_STRING,
    searchSelectedCategories = [],
    isOpen = false
}) => {
    const styles = useStyles();

    const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
    const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
    const [showNavigationOptions, setShowNavigationOptions] = useState(true);

    const sliderRef = useRef({} as HTMLDivElement);

    const onLeftButtonClick = useCallback(() => {
        //scroll if there is more to scroll
        if (sliderRef.current.scrollLeft > 0) {
            sliderRef.current.scroll(sliderRef.current.scrollLeft - sliderRef.current.clientWidth, 0);
        }
    }, [sliderRef]);

    const onRightButtonClick = useCallback(() => {
        //scroll if there is more to scroll
        if (sliderRef.current.scrollLeft + sliderRef.current.clientWidth < sliderRef.current.scrollWidth) {
            sliderRef.current.scroll(sliderRef.current.scrollLeft + sliderRef.current.clientWidth, 0);
        }
    }, [sliderRef]);

    useEffect(() => {
        setTimeout(() => {
            setShowNavigationOptions(sliderRef.current?.scrollWidth > sliderRef.current.clientWidth);
        }, 1000);
    }, [sliderRef]);

    const onDivScroll = useCallback(() => {
        setIsLeftButtonDisabled(Math.round(sliderRef.current.scrollLeft) <= 0);
        setIsRightButtonDisabled(Math.round(sliderRef.current.scrollLeft + sliderRef.current.clientWidth) >= sliderRef.current.scrollWidth);
    }, [sliderRef]);

    const renderTitleComponent = useMemo(() => {
        return <Subtitle1 block className={styles.title}>{headerTitle}</Subtitle1>;
    }, [headerTitle])

    const renderCardCarouselHeader = <CardCarouselHeader
        isLeftButtonDisabled={isLeftButtonDisabled}
        isRightButtonDisabled={isRightButtonDisabled}
        onLeftButtonClick={onLeftButtonClick}
        onRightButtonClick={onRightButtonClick}
        classname={styles.carouselHeader}
        isOpen={typeIsAccordion ? isOpen : true}
        searchQuery={searchQuery}
        searchSelectedCategories={searchSelectedCategories}
    />;

    const renderCardCarouselItems = useCallback(() => {
        return <div className={`${styles.cardsContainer} no-scrollbar`} ref={sliderRef} onScroll={onDivScroll}>
            <div className={`${styles.innerRoot} ${carouselClassname}`} >
                {cards.map((item, index) => <div key={index}><DisplayCard cardData={item} isImage={cardIsImage} /></div>)}
            </div>
        </div>
    }, [sliderRef, onDivScroll, cards, cardIsImage, carouselClassname])

    return (
        typeIsAccordion
            ? <>
                <div className={mergeClasses(styles.flexDisplay, headerTitleClassname)}>
                    <AccordionHeader>{renderTitleComponent}</AccordionHeader>
                    {showNavigationOptions && renderCardCarouselHeader}
                </div>
                <AccordionPanel>{renderCardCarouselItems()}</AccordionPanel>
            </>
            : <>
                <div className={mergeClasses(styles.flexDisplay, headerTitleClassname)}>{renderTitleComponent}{showNavigationOptions && renderCardCarouselHeader}</div>
                {renderCardCarouselItems()}
            </>
    )

};