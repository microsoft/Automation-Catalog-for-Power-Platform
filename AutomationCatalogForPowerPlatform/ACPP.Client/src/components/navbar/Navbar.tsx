import { useCallback, useContext, useEffect, useMemo } from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, Text } from '@fluentui/react-components';
import { MoreHorizontal24Regular, PersonFeedback24Regular, QuestionCircle24Regular, Settings24Regular } from '@fluentui/react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScreenSize } from '../../hooks/useScreenSize';
import { EventTypes } from '../../common/models/LoggingServiceTypes';
import { DEEPLINK_FEEDBACK, screenSizes } from '../../common/helpers/Constants';
import { useStyles } from './Navbar.styles';
import config from '../../config';
import { DeepLinkContext } from '../../common/contexts/DeeplinkContext';
import { LoggerContext } from '../../common/contexts/LoggerContext';

export default function Navbar() {
  const { trackEvent } = useContext(LoggerContext);
  const { targetComponentId } = useContext(DeepLinkContext);
  const { t } = useTranslation(['Common', 'Navbar']);
  const classes = useStyles();
  const { width } = useScreenSize();
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (targetComponentId === DEEPLINK_FEEDBACK) {
      trackEvent('MENU_ITEM_CLICK', {
        eventType: EventTypes.USER_EVENT,
        eventName: 'menuItemClick',
        eventDetails: { menuItemId: 'feedback' },
      });
    }
  }, []);


  const onSettingsClick = useCallback(() => {
    trackEvent('MENU_ITEM_CLICK', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'menuItemClick',
      eventDetails: { menuItemId: 'settings' },
    });
    navigate('/Settings');
  }, [navigate, trackEvent]);

  const handleFeedbackClick = () => {
    trackEvent('SHARE_IDEA_CLICK', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'shareIdeaClick',
    });
    const newWindow = window.open(config.feedbackFormUrl);
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const onHelpClick = useCallback(() => {
    trackEvent('MENU_ITEM_CLICK', {
      eventType: EventTypes.USER_EVENT,
      eventName: 'menuItemClick',
      eventDetails: { menuItemId: 'help' },
    });
    const newWindow = window.open(config.faqUrl);
    if (newWindow) {
      newWindow.opener = null;
    }
  }, [trackEvent]);

  const leftMenuItems = useMemo(() => {
    return [
      {
        id: 'home',
        label: t('Navbar:home'),
        onclick: () => {
          navigate('/');
        },
        paths: ['/', '/HomePage', '/Home', '/index.html', '/StaticContent/hometab/index.html'],
      },
      {
        id: 'myProfile',
        label: t('Navbar:myProfile'),
        onclick: () => {
          navigate('/MyProfile');
        },
        paths: ['/MyProfile'],
      },
      {
        id: 'about',
        label: t('Navbar:about'),
        onclick: () => {
          navigate('/About');
        },
        paths: ['/About'],
      },
    ];
  }, []);

  const rightMenuItems = useMemo(() => {
    const itemsToReturn = [{
      id: 'settings',
      icon: <Settings24Regular className={classes.navbarRightMenuItemLink} data-testid="settingsIcon" />,
      label: t('Navbar:settings'),
      onclick: () => {
        onSettingsClick();
      },
      showInNavbar: true
    }];

    if (config.feedbackFormUrl) {
      itemsToReturn.push({
        id: 'feedback',
        icon: <PersonFeedback24Regular className={classes.navbarRightMenuItemLink} data-testid="feedbackIcon" />,
        label: t('Navbar:feedback'),
        onclick: () => {
          handleFeedbackClick();
        },
        showInNavbar: true,
      });
    }

    if (config.faqUrl) {
      itemsToReturn.push({
        id: 'help',
        icon: <QuestionCircle24Regular className={classes.navbarRightMenuItemLink} data-testid="helpIcon" />,
        label: t('Navbar:help'),
        onclick: () => {
          onHelpClick();
        },
        showInNavbar: true,
      })
    }

    return itemsToReturn;
  }, []);

  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.click();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img className={classes.logoImg} src={config.ahLogo} alt="Logo" />
      </div>
      <div className={classes.navbarTitle}>
        <Text weight="bold" size={500}>
          {config.appTitle}
        </Text>
      </div>
      <div className={classes.navbarLeftMenu}>
        {leftMenuItems.map((item) => (
          <div key={item.id} className={`${classes.navbarMenuItem} ${item.paths?.includes(location.pathname) ? classes.navbarMenuItemActive : ''}`}>
            <span className={classes.navbarLeftMenuItemLink} onClick={item.onclick} tabIndex={1} onKeyDown={handleEnter}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className={classes.navbarRightMenu}>
        {width <= screenSizes.sm ? null : (
          <div className={classes.navbarRightSubMenu}>
            {rightMenuItems
              .filter((item) => item.showInNavbar)
              .map((item) => (
                <div key={item.id} title={item.label} className={classes.navbarMenuItem} onClick={item.onclick} onKeyDown={handleEnter} tabIndex={0}>
                  {item.icon}
                </div>
              ))}
          </div>
        )}
        {rightMenuItems
          .filter((item) => !item.showInNavbar || (width < screenSizes.sm && item.showInNavbar)).length > 0
          ? <Menu>
            <MenuTrigger disableButtonEnhancement>
              <div className={classes.navbarMenuItem} title={t('Navbar:more')}>
                <MoreHorizontal24Regular
                  className={classes.navbarRightMenuItemLink}
                  aria-label="More"
                  data-testid="moreIcon"
                />
              </div>
            </MenuTrigger>

            <MenuPopover>
              <MenuList data-testid="moreMenu">
                {rightMenuItems
                  .filter((item) => !item.showInNavbar || (width < screenSizes.sm && item.showInNavbar))
                  .map((item) => (
                    <MenuItem key={item.id} onClick={item.onclick}>
                      {item.label}
                    </MenuItem>
                  ))}
              </MenuList>
            </MenuPopover>
          </Menu>
          : <></>
        }
      </div>
    </div>
  );
}
