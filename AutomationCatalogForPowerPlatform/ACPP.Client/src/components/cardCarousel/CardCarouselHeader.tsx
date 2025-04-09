import { CardCarouselHeaderProps } from "./CardCarouselHeaderProps";
import { ChevronLeft12Filled, ChevronLeft12Regular, ChevronRight12Filled, ChevronRight12Regular, bundleIcon } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-button";
import { useStyles } from "./CardCarouselHeader.styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { mergeClasses } from '@fluentui/react-components';
import { useScreenSize } from "../../hooks/useScreenSize";

const ChevronLeft = bundleIcon(ChevronLeft12Filled, ChevronLeft12Regular);
const ChevronRight = bundleIcon(ChevronRight12Filled, ChevronRight12Regular);

export const CardCarouselHeader: React.FC<CardCarouselHeaderProps> = (props: CardCarouselHeaderProps) => {
    const styles = useStyles();
    const { isMD } = useScreenSize();
    const navigate = useNavigate();
    const { t } = useTranslation(['Common']);
    const { isLeftButtonDisabled, isRightButtonDisabled, onLeftButtonClick, onRightButtonClick, classname, isOpen, searchQuery, searchSelectedCategories } = props;

    const headerItems = <>
        <Button appearance="transparent" className={styles.seeAllBtn} onClick={() => { navigate('/Search', { state: { queryText: searchQuery, selectedCategories: searchSelectedCategories } }) }} aria-label={t("Common:seeAll")}>{t("Common:seeAll")}</Button>
        <Button appearance="transparent" icon={<ChevronLeft />} disabled={isLeftButtonDisabled} onClick={onLeftButtonClick as any} aria-label="Previous" />
        <Button appearance="transparent" icon={<ChevronRight />} disabled={isRightButtonDisabled} onClick={onRightButtonClick as any} aria-label="Next" />
    </>;

    const mobileHeaderItems = <>
        <Button appearance="transparent" icon={<ChevronRight />} onClick={() => { navigate('/Search', { state: { queryText: searchQuery, selectedCategories: searchSelectedCategories } }) }} aria-label={t("Common:seeAll")} />
    </>;

    return (
        <div className={mergeClasses(styles.navigationHeader, isOpen ? styles.showOnOpen : styles.hideOnClose, classname)}>{isMD ? mobileHeaderItems : headerItems}</div>
    )

}