import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  Caption1, Card, CardFooter, CardHeader, mergeClasses, Tag, Text
} from '@fluentui/react-components';
import { People16Regular } from '@fluentui/react-icons';

import { screenSizes } from '../../common/helpers/Constants';
import { useScreenSize } from '../../hooks/useScreenSize';
import { MoreCardDrawerWrapper } from '../moreCardDrawer/MoreCardDrawerWrapper';
import { MoreCardMenu } from '../moreCardMenu/MoreCardMenu';
import { ShareToTeamsMenu } from '../shareToTeams/ShareToTeams';
import { useStyles as iconStyles } from './cardStyles/IconCard.styles';
import { useStyles as imageStyles } from './cardStyles/ImageCard.styles';
import { useStyles } from './DisplayCard.styles';
import { IconHeader } from './iconHeader/IconHeader';
import { IDisplayCardProps } from './IDisplayCardProps';
import { ImageHeader } from './imageHeader/ImageHeader';

const DisplayCard: React.FC<IDisplayCardProps> = ({ cardData, isImage, className }: IDisplayCardProps) => {

  const styles = useStyles();
  const cardStyles = isImage ? imageStyles() : iconStyles();
  const { t } = useTranslation(["Common", "Cards"]);
  const navigate = useNavigate();
  const { width } = useScreenSize();

  return (
    <Card className={mergeClasses(className, cardStyles.card)} onClick={() => { navigate("/ItemDetails", { state: { cardUniqueName: cardData.solutionTemplateUniqueId } }) }}>
      {isImage ? <ImageHeader cardData={cardData} /> : <IconHeader cardData={cardData} />}

      <div className={cardStyles.cardContainerFlex}>
        <div className={mergeClasses(styles.cardContentFlex, styles.cursorHover)}>
          <CardHeader
            header={
              <Text weight="semibold" className={cardStyles.cardHeaderText} title={cardData.cardTitle}>
                {cardData.cardTitle}
              </Text>
            }
          />
          <div className={mergeClasses(styles.grayText, cardStyles.cardPreview)}>
            <Caption1 className={styles.caption}>{cardData.cardCategory}</Caption1>
            <br />
            {/* ISHAGAUTAM: ADD THIS CODE BACK FOR CARD TIME SAVINGS AND FREQUENCY AFTER CONFIRMATION WITH PM */}
            {/* <Caption1 className={styles.caption}>{cardData.cardTimeSavings} {cardData.cardTimeSavings <= 1 ? t("Cards:min") : t("Cards:mins")} | {cardData.cardFrequency.toLocaleLowerCase()}</Caption1> */}
          </div>
        </div>
        <CardFooter className={mergeClasses(styles.cardFooter, styles.grayText, cardStyles.footerFlex)}>
          <div className={styles.footerText}>
            <People16Regular className={styles.clicksIcon} />
            <Text className={styles.noOfClicks}>{cardData.noOfClicks}</Text>
          </div>
          <div className={!isImage ? styles.maxContentWidth : ''} onClick={(ev) => { ev.stopPropagation(); }}>
            <ShareToTeamsMenu
              cardUniqueName={cardData.solutionTemplateUniqueId}
              message={t("Common:defaultComposeShareToTeams")}
              preview={true}
              className={cardStyles.shareToTeams}
              setShareButtonText={false}
            />
            {!isImage && cardData.isNew &&
              <div className={mergeClasses(cardStyles.newTagStyle, cardStyles.footerNewTagStyle)}>
                <Tag size="small" shape="rounded" appearance="brand">{t("Common:new")}</Tag>
              </div>
            }
            {!isImage && width <= screenSizes.sm
              ? <MoreCardDrawerWrapper cardData={cardData}
                message={t("Common:defaultComposeShareToTeams")}
                preview={true} />
              : <MoreCardMenu cardData={cardData} />
            }
          </div>
        </CardFooter>
      </div>
    </Card >
  );
}

export default DisplayCard;