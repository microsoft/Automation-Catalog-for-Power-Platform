// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, LargeTitle, Link } from '@fluentui/react-components';
import { Divider } from '@fluentui/react-divider';
import { Dismiss16Regular } from '@fluentui/react-icons';
import {
    MessageBar, MessageBarActions, MessageBarBody, MessageBarIntent
} from '@fluentui/react-components';
import { DisplayCanvas } from '../../common/controls/DisplayCanvas/DisplayCanvas';
import { RootCanvas } from '../../common/controls/RootCanvas/RootCanvas';
import { useGetAnnouncementBannerData } from '../../hooks/useGetAnnouncementBannerData';
import Categories from '../categories/Categories';
import IdeaSubmission from '../ideaSubmission/IdeaSubmission';
import { SearchBar } from '../searchBar/SearchBar';
import { useStyles } from './HomePage.styles';
import { useCommonStyles } from '../../common.styles';
import { UserContext } from '../../common/contexts/UserContext';
import { useGetAllCards } from '../../hooks/useGetAllCards';
import { AppContext } from '../../common/contexts/AppContext';
import { CenteredSpinner } from '../centeredSpinner/centeredSpinner';
import { CardCarousel } from '../cardCarousel/CardCarousel';
import { DeepLinkContext } from '../../common/contexts/DeeplinkContext';
import { EventTypes } from '../../common/models/LoggingServiceTypes';
import { useNavigate } from 'react-router-dom';
import { useScreenSize } from '../../hooks/useScreenSize';
import { LoggerContext } from '../../common/contexts/LoggerContext';
import { SolutionTemplateCard } from '../../common/models/SolutionTemplateCard';
import config from '../../config';

export const HomePage = () => {

    const styles = useStyles();
    const commonStyles = useCommonStyles();
    const { t } = useTranslation(['HomePage', 'Common']);
    const { userBasicData } = useContext(UserContext);
    const { appEnv } = useContext(AppContext);
    const [welcomeText, setWelcomeText] = useState<string>(t("welcome"));
    const [announcementType, setAnnouncementType] = useState<MessageBarIntent>();
    const [announcementMessage, setAnnouncementMessage] = useState<string>("");
    const [announcementLinkUrl, setAnnouncementLinkUrl] = useState<string | undefined>("");
    const [announcementLinkText, setAnnouncementLinkText] = useState<string | undefined>("");
    const { isLoading: isAnnounceDataLoading, isError: isAnnounceDataError, data: announceData } = useGetAnnouncementBannerData(appEnv!);
    const [featuredCards, setFeaturedCards] = useState<SolutionTemplateCard[]>([]);
    const [allCards, setAllCards] = useState<SolutionTemplateCard[]>([]);
    const { campaignId, cardUniqueName, source, clearContext } = useContext(DeepLinkContext);
    const { trackEvent, setCurrentPage } = useContext(LoggerContext);
    const navigate = useNavigate();
    const { isSM } = useScreenSize();

    const { isError: cardsDataIsError, isLoading: cardsDataIsLoading, data: cardsData } = useGetAllCards(appEnv!);

    useEffect(() => {
        if (!cardsDataIsError && !cardsDataIsLoading && cardsData && cardsData.length > 0) {
            setAllCards(cardsData);
            setFeaturedCards(cardsData.filter((card: SolutionTemplateCard) => card.isFeatured));
        }
    }, [cardsDataIsError, cardsDataIsLoading, cardsData]);

    useEffect(() => {
        userBasicData?.isFirstVisit
            ? setWelcomeText(t("welcome"))
            : setWelcomeText(t("welcomeBack"));
    }, [userBasicData]);

    useEffect(() => {
        if (!isAnnounceDataError && !isAnnounceDataLoading && announceData?.setAnnouncement) {
            setAnnouncementType(announceData.announcementType);
            setAnnouncementMessage(announceData.announcementMessage);
            setAnnouncementLinkUrl(announceData.announcementLinkUrl);
            setAnnouncementLinkText(announceData.announcementLinkText);
        }
    }, [isAnnounceDataError, isAnnounceDataLoading, announceData]);

    const onDismissAnnouncement = (id: string) => {
        document.getElementById(id)?.style.setProperty("display", "none");
    };

    const onPDEBannerClick = useCallback(() => {
        navigate("/Settings", { state: { focusPDEInput: true } });
    }, []);

    useEffect(() => {
        setCurrentPage("homepage");
        if (campaignId && source) {
            trackEvent("MARKETING_REDIRECTION",
                {
                    eventName: "userLandedFromMarketing",
                    eventType: EventTypes.USER_EVENT,
                    eventDetails: {
                        cardUniqueId: cardUniqueName,
                        cardDeeplinkSource: source,
                        campaignId: campaignId
                    }
                }
            )
        }
        const deepLinkData = {
            cardUniqueName: '',
            source: '',
            campaignId: '',
        };

        //clear the context to avoid infinite redirection
        typeof clearContext == 'function' && clearContext(deepLinkData);
        if (cardUniqueName) {
            navigate("/ItemDetails", { state: { cardUniqueName: cardUniqueName } })
        }
    }, [campaignId, cardUniqueName, source]);

    const renderFeaturedCarousel = useCallback(() => {
        return featuredCards.length > 0 ?
            <div className={styles.featuredCarousel}>
                <CardCarousel cards={featuredCards} headerTitle={t('featured')} cardIsImage searchSelectedCategories={[t('featured')]} carouselClassname={styles.carouselClassname}/>
            </div>
            : <div style={{ marginTop: '5%' }}></div>;
    }, [featuredCards]);

    const renderCategories = useCallback(() => {
        return allCards.length > 0 ? <Categories className={styles.categoriesStyles} cards={allCards} /> : <CenteredSpinner classNames={commonStyles.padding5} />;
    }, [allCards]);

    const renderAnnouncementBanner = useCallback(() => {
        if (announceData?.setAnnouncement) {
            return (
                <MessageBar intent={announcementType} className={commonStyles.announcementBanner} id="announcementBanner">
                    <MessageBarBody className={commonStyles.announcementBody}>
                        {announcementMessage}&nbsp;
                        {announcementLinkUrl && announcementLinkText && <Link href={announcementLinkUrl} target="_blank">{announcementLinkText}</Link>}
                    </MessageBarBody>
                    <MessageBarActions
                        containerAction={
                            <Button appearance="transparent" icon={<Dismiss16Regular aria-label="Dismiss" />} onClick={() => { onDismissAnnouncement("announcementBanner") }} />
                        }
                    ></MessageBarActions>
                </MessageBar>
            );
        }
        return null;
    }, [announceData, announcementType, announcementMessage, announcementLinkUrl, announcementLinkText]);

    const renderPDEBanner = useCallback(() => {
        if (!config.adminDefaultEnv && !userBasicData?.personalDevEnvId)
            return (
                <MessageBar intent="info" className={commonStyles.announcementBanner} id="pdeAnnouncement">
                    <MessageBarBody className={commonStyles.announcementBody}>
                        {t("Common:pdeBannerMessage")}
                    </MessageBarBody>
                    <MessageBarActions>
                        <Button onClick={() => onPDEBannerClick()}>{t("Common:selectEnvironment")}</Button>
                    </MessageBarActions>
                </MessageBar>
            );
        return null;
    }, [userBasicData?.personalDevEnvId]);

    return (
        <RootCanvas>
            {
                isSM && renderPDEBanner()
            }
            {
                isSM && renderAnnouncementBanner()
            }
            <div className={styles.homeHeader}>
                <LargeTitle className={styles.welcomeText}>{welcomeText}</LargeTitle>
                <SearchBar className={styles.searchBar} />
            </div>
            <DisplayCanvas>
                {
                    !isSM && renderPDEBanner()
                }
                {
                    !isSM && renderAnnouncementBanner()
                }
                {
                    renderFeaturedCarousel()
                }
                {
                    config.feedbackFormUrl && <IdeaSubmission />
                }
                <Divider className={styles.divider} />
                {
                    renderCategories()
                }
            </DisplayCanvas>
        </RootCanvas>
    );
}
