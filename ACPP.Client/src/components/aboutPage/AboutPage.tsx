import React from 'react';

import { Divider, Link, Subtitle1, Text } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import { useStyles } from './AboutPage.styles';
import config from '../../config';

const AboutPage: React.FC = () => {
  const { t } = useTranslation(['Common', 'AboutPage']);
  const styles = useStyles();

  const links = [
    { href: config.privacyPolicyLink, text: t('AboutPage:privacyPolicy') },
    { href: config.termsOfUseLink, text: t('AboutPage:termsOfUse') },
  ];

  return (
    <div className={styles.root} data-testid="about-page">
      <Subtitle1 className={styles.header} align="start" data-testid="about-header">
        {t('AboutPage:aboutHeader')}
      </Subtitle1>
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
  );
};

export default AboutPage;
