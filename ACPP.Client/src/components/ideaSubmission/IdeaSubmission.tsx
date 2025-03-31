import React, { useContext } from 'react';
import { Button, Card, CardHeader, Image, Subtitle2, mergeClasses } from '@fluentui/react-components';
import { bundleIcon, ArrowRight20Regular, ArrowRight20Filled } from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import { screenSizes } from '../../common/helpers/Constants';
import { EventTypes } from '../../common/models/LoggingServiceTypes';
import { useScreenSize } from '../../hooks/useScreenSize';
import { IdeaSubmissionProps } from './IdeaSubmissionProps';
import { useStyles } from './IdeaSubmissionPanel.styles';
import config from '../../config';
import { LoggerContext } from '../../common/contexts/LoggerContext';

const RightArrowIcon = bundleIcon(ArrowRight20Filled, ArrowRight20Regular);

const IdeaSubmission: React.FC<IdeaSubmissionProps> = ({ className }) => {
  const { trackEvent } = useContext(LoggerContext);
  const { t } = useTranslation('IdeaSubmission');
  const { width } = useScreenSize();
  const styles = useStyles();

  const handleFeedbackClick = () => {
    trackEvent('SHARE_IDEA_CLICK', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'shareIdeaClick',
    });
    window.open(config.feedbackFormUrl, '_blank');
  };

  return (
    <div className={mergeClasses(styles.root, className)}>
      <Card className={styles.card} size="small" onClick={handleFeedbackClick}>
        <CardHeader
          header={
            <div className={styles.row}>
              <Image src={config.shareIdeasImageUrl} className={styles.image} alt="Suggest idea image" />
              <Subtitle2 className={styles.title}>
                {width > screenSizes.sm ? t('submitIdea') : t('submitIdeaShort')}
              </Subtitle2>
            </div>
          }
          action={<Button
            appearance="transparent"
            icon={<RightArrowIcon aria-label="Suggest idea" />}
            className={styles.rightArrowIcon}
            data-testid="submitIdea"
          />}
        />
      </Card>
    </div>
  );
};

export default IdeaSubmission;
