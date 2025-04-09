import React from 'react';

import { Divider, LargeTitle, Link, Text } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import { useStyles } from './AboutPage.styles';
import config from '../../config';
import { RootCanvas } from '../../common/controls/RootCanvas/RootCanvas';
import { DisplayCanvas } from '../../common/controls/DisplayCanvas/DisplayCanvas';

const AboutPage: React.FC = () => {
  const { t } = useTranslation(['Common', 'AboutPage']);
  const styles = useStyles();

  const links = [
    { href: config.privacyPolicyLink, text: t('AboutPage:privacyPolicy') },
    { href: config.termsOfUseLink, text: t('AboutPage:termsOfUse') },
  ];

  return (
    <RootCanvas>
      <div className={styles.homeHeader}>
        <LargeTitle className={styles.headerText} aria-label={t('AboutPage:aboutHeader')}>{t('AboutPage:aboutHeader')}</LargeTitle>
      </div>
      <DisplayCanvas>        
        <div className={styles.root} data-testid="about-page">
          <Text className={styles.body} align="start" data-testid="about-content">
            {t('AboutPage:aboutContent')}
          </Text>
          <div className={styles.links}>
            {links.map((link, index) => (
              <React.Fragment key={index}>
                <Link appearance="subtle" href={link.href} target="_blank">
                  {link.text}
                </Link>
                {index < links.length - 1 && <Divider vertical style={{ height: '100%' }} data-testid="divider" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </DisplayCanvas>
    </RootCanvas>
  );
};

export default AboutPage;
