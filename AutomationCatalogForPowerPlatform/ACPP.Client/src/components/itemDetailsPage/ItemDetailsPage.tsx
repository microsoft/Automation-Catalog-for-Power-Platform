import DOMPurify from 'dompurify';
// import IdeaSubmission from '../ideaSubmission/IdeaSubmission';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, Divider,
    mergeClasses, Text, Title3
} from '@fluentui/react-components';
import { ChevronLeftFilled, People16Regular } from '@fluentui/react-icons';

import { useCommonStyles } from '../../common.styles';
import { AppContext } from '../../common/contexts/AppContext';
import { LoggerContext } from '../../common/contexts/LoggerContext';
import { UserContext } from '../../common/contexts/UserContext';
import { DisplayCanvas } from '../../common/controls/DisplayCanvas/DisplayCanvas';
import { RootCanvas } from '../../common/controls/RootCanvas/RootCanvas';
import { EventTypes } from '../../common/models/LoggingServiceTypes';
import { SolutionTemplateCard } from '../../common/models/SolutionTemplateCard';
import config from '../../config';
import { useGetAllCards } from '../../hooks/useGetAllCards';
import { useGetUserCatalogItems } from '../../hooks/useGetUserCatalogItems';
import { useUpdateClickCount } from '../../hooks/useUpdateCardClickCount';
import { CardCarousel } from '../cardCarousel/CardCarousel';
import { CenteredSpinner } from '../centeredSpinner/centeredSpinner';
import { ShareToTeamsMenu } from '../shareToTeams/ShareToTeams';
import { useStyles } from './ItemDetailsPage.styles';

export const ItemDetailsPage: React.FC = () => {
    const { trackEvent, setCurrentPage } = useContext(LoggerContext);
    const { t } = useTranslation(['Common', 'ShareToTeams', 'Cards']);
    const styles = useStyles();
    const commonStyles = useCommonStyles();
    const navigate = useNavigate();
    const { userBasicData } = useContext(UserContext);
    const { appEnv } = useContext(AppContext);
    //this call does not call the api again as the data is already fetched in the home page
    const { isError: cardsDataIsError, isLoading: cardsDataIsLoading, data: cardsData } = useGetAllCards(appEnv!);
    const { mutate: updateCardClickCount } = useUpdateClickCount();
    const [showPDEDialog, setShowPDEDialog] = useState<boolean>(false);

    const { state: { cardUniqueName } } = useLocation();

    const [cardData, setCardData] = useState<SolutionTemplateCard>();
    const [relatedCards, setRelatedCards] = useState<SolutionTemplateCard[]>([]);
    const { data: userCatalogItemsData } = useGetUserCatalogItems(appEnv!);
    
    useEffect(() => {
        if (!cardsDataIsError && !cardsDataIsLoading && cardsData && cardsData.length > 0 && cardUniqueName) {
            setCardData(cardsData.find((card: SolutionTemplateCard) => card.solutionTemplateUniqueId === cardUniqueName));
        }
    }, [cardsDataIsError, cardsDataIsLoading, cardsData, cardUniqueName]);

    useEffect(() => {
        if (cardsData && cardsData.length > 0) {
            setRelatedCards(cardsData.filter(
                (card: SolutionTemplateCard) =>
                    card.cardCategory === cardData?.cardCategory
                    && card.solutionTemplateUniqueId !== cardData?.solutionTemplateUniqueId
            ));
        }
    }, [cardData, cardsData]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentPage('itemDetailsPage');
        updateCardClickCount(cardUniqueName!);
        trackEvent("ITEM_DETAILS_PAGE_LOADED",
            {
                eventName: "UserOpenedItemDetailsPage",
                eventType: EventTypes.USER_EVENT,
                eventDetails: {
                    cardUniqueId: cardUniqueName
                }
            }
        )
    }, [cardUniqueName]);

    const onPDEBannerClick = useCallback(() => {
        setShowPDEDialog(false);
        navigate("/Settings", { state: { focusPDEInput: true } });
    }, []);

    const openNewWindow = useCallback((url: string) => {
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            newWindow.opener = null;
        }
    }, []);

    const onCreateClicked = useCallback((card: SolutionTemplateCard) => {
        trackEvent("CREATE_BUTTON_CLICKED",
            {
                eventName: "UserClickedCreateButton",
                eventType: EventTypes.USER_EVENT,
                eventDetails: {
                    cardUniqueId: cardUniqueName
                }
            }
        )
        if (!config.adminDefaultEnv && !userBasicData?.personalDevEnvId) {
            setShowPDEDialog(true);
            return;
        }

        if (userBasicData?.personalDevEnvId!) {
            const installUrl = config.catalogInstallUrl(card.solutionTemplateUniqueId!, userBasicData?.personalDevEnvId!);
            openNewWindow(installUrl);
        } else if (config.adminDefaultEnv) {
            const installUrl = config.catalogInstallUrl(card.solutionTemplateUniqueId!, config.adminDefaultEnv);
            openNewWindow(installUrl);
        }

    }, [cardUniqueName, trackEvent, userBasicData?.personalDevEnvId]);

    const renderPDEDialog = useCallback(() => {
        if (!userBasicData?.personalDevEnvId && showPDEDialog) {
            return (
                <Dialog open={true} modalType="alert">
                    <DialogSurface>
                        <DialogBody>
                            <DialogTitle>{t("pdeDialogTitle")}</DialogTitle>
                            <DialogContent>
                                <p>
                                    {t("pdeDialogMessage")}
                                </p>
                            </DialogContent>
                            <DialogActions>
                                <Button appearance="primary" onClick={() => onPDEBannerClick()}>{t("Common:selectEnvironment")}</Button>
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </Dialog>
            );
        }
        return null;
    }, [showPDEDialog, userBasicData?.personalDevEnvId]);

    return (
        <RootCanvas datatest-id='item-detailsPage' className={styles.root} >
            <DisplayCanvas className={styles.displayCanvas}>
                {
                    cardData ?
                        <>
                            <div className={styles.header}>
                                <Button
                                    icon={<ChevronLeftFilled className={commonStyles.backButtonIcon} />}
                                    appearance='subtle'
                                    size='small'
                                    className={commonStyles.backButton}
                                    onClick={() => { navigate(-1) }}
                                    data-testid="item-backButton"
                                >
                                    {t('Common:back')}
                                </Button>
                                <Divider vertical className={styles.headerDivider} />
                                <ShareToTeamsMenu
                                    message={`${cardData?.cardTitle}`}
                                    cardUniqueName={cardData?.solutionTemplateUniqueId}
                                    preview={true}
                                    className={styles.shareToTeams}
                                    setShareButtonText={true}
                                    data-testid="item-shareToTeams"
                                />
                            </div>
                            <div className={styles.body}>
                                <Title3 className={styles.title} data-testid="item-title">{cardData?.cardTitle}</Title3>
                                <div className={styles.subtitleLine}>
                                    <Text className={styles.subtitleTextLeft} data-testid="item-category">{cardData?.cardCategory}</Text>
                                    <Divider vertical className={styles.subtitleLineDivider} />
                                    <People16Regular className={styles.peopleIcon} />
                                    <Text className={styles.subtitleTextRight} data-testid="item-noOfInstallations">{cardData?.noOfClicks}</Text>
                                </div>
                                &nbsp;
                                {/* ISHAGAUTAM: ADD THIS CODE BACK FOR CARD TIME SAVINGS AND FREQUENCY AFTER CONFIRMATION WITH PM */}
                                {/* <div className={styles.subtitleLine}>
                                    <Text className={styles.subtitleTextLeft} data-testid="item-timeSavings">{cardData?.cardTimeSavings} {cardData.cardTimeSavings <= 1 ? t("Cards:min") : t("Cards:mins")}</Text>
                                    <Divider vertical className={styles.subtitleLineDivider} />
                                    <Text className={styles.subtitleTextRight} data-testid="item-timeSavingsFrequency">{cardData?.cardFrequency.toLocaleLowerCase()}</Text>
                                </div> */}
                                <div className={styles.bodyBox}>
                                    <div className={styles.bodyMain}>
                                        <>
                                            <div className={styles.bodyDescription} data-testid="item-longDescription" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cardData?.cardDescription) }} />
                                            {userCatalogItemsData?.filter(item => item.solutionId).some(item => item.mspcat_CatalogItem.solutionName === cardData.cardTitle) ?
                                                <div>
                                                    <Button appearance="primary" onClick={() => {
                                                        const matchingItem = userCatalogItemsData?.find(item => item.solutionId && item.mspcat_CatalogItem.solutionName === cardData.cardTitle);
                                                        if (matchingItem?.flowUrl) {
                                                            openNewWindow(matchingItem.flowUrl);
                                                        }
                                                    }} className={mergeClasses(styles.createButton, styles.installedItemButton)} data-testid="item-manageButton">
                                                        {t('Common:manage')}
                                                    </Button>
                                                    <Button appearance="secondary" onClick={() => onCreateClicked(cardData)} className={styles.createButton} data-testid="item-createButton">
                                                        {t('Common:createAnother')}
                                                    </Button>
                                                </div>
                                            :
                                            <Button appearance="primary" onClick={() => onCreateClicked(cardData)} className={styles.createButton} data-testid="item-createButton">
                                                {t('Common:create')}
                                            </Button>
                                    }
                                        </>
                                    </div>
                                    {cardData?.cardVideoUrl ?
                                        <video controls className={styles.bodyVideo}>
                                            <source src={cardData?.cardVideoUrl} type="video/mp4" />
                                        </video>
                                        :
                                        <img alt={cardData?.cardImageUrl} src={cardData?.cardImageUrl} className={cardData?.isFeatured ? styles.bodyImageIsFeatured : styles.bodyImage} data-testid="item-imageUrl" />
                                    }
                                </div>
                            </div>

                            <Divider className={styles.relatedItemsDivider} />
                            {
                                relatedCards.length > 0 &&
                                <CardCarousel cards={relatedCards}
                                    carouselClassname={styles.relatedItemsCarousel}
                                    headerTitle={t('Common:relatedAutomations')}
                                    headerTitleClassname={styles.relatedItemsTitle}
                                    searchSelectedCategories={[cardData?.cardCategory!]}
                                />
                            }

                            {/* <IdeaSubmission className={styles.ideaSubmission} /> */}

                        </> : <CenteredSpinner />
                }
            </DisplayCanvas>
            {
                renderPDEDialog()
            }
        </RootCanvas >
    );
}