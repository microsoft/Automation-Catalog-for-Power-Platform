// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger, mergeClasses
} from '@fluentui/react-components';
import {
  bundleIcon, LinkFilled, LinkRegular, PeopleTeamFilled, PeopleTeamRegular, Share16Regular
} from '@fluentui/react-icons';

import { screenSizes, SUCCESS_TOAST_INTENT } from '../../common/helpers/Constants';
import { shareToTeams } from '../../common/helpers/ShareToTeamsHelper';
import { useScreenSize } from '../../hooks/useScreenSize';
import { IShareToTeamsProps } from './IShareToTeamsProps';
import { useStyles } from './ShareToTeams.styles';
import { useToast } from '../../hooks/useToast';
import { useBetween } from 'use-between';
import { getCardDeeplink } from '../../common/helpers/CardDeeplinkHelper';
import config from '../../config';

const CopyLinkIcon = bundleIcon(LinkFilled, LinkRegular);
const PeopleTeamIcon = bundleIcon(PeopleTeamFilled, PeopleTeamRegular);

export const ShareToTeamsMenu: React.FC<IShareToTeamsProps> = ({ className, cardUniqueName, message, preview, setShareButtonText }: IShareToTeamsProps) => {
  const { t } = useTranslation(["ShareToTeams"]);
  const styles = useStyles();

  return (
    config.teamsAppId
      ? <div className={mergeClasses(styles.shareToTeams, className)}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton icon={<Share16Regular aria-label="Share to Teams" />} size="medium" className={styles.menuButton} data-testid="shareToTeamButton">
              {setShareButtonText ? t('share') : ''}
            </MenuButton>
          </MenuTrigger>

          <MenuPopover>
            <MenuList data-testid="shareToTeamMenu">
              <ShareToTeamsMenuItems cardUniqueName={cardUniqueName} preview={preview} message={message} setShareButtonText={setShareButtonText} />
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      : <></>
  );
};

export const ShareToTeamsMenuItems: React.FC<IShareToTeamsProps & { fromDrawer?: boolean, toggleDrawer?}> = ({ className, cardUniqueName, message: shareToTeamsMsg, preview, fromDrawer, toggleDrawer }) => {
  const { t } = useTranslation(["ShareToTeams"]);
  const { width } = useScreenSize();
  const useSharedToast = () => useBetween(useToast);
  const { message, intent, updateToastState } = useSharedToast();

  const cardDeeplink = useMemo(() => getCardDeeplink(cardUniqueName) ?? '', [cardUniqueName]);

  const copyToClipboard = React.useCallback((cardDeeplink: string) => {
    try {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = cardDeeplink ?? "";
      document.body.appendChild(tempTextArea);

      tempTextArea.select();
      tempTextArea.setSelectionRange(0, 99999);
      document.execCommand("copy");

      document.body.removeChild(tempTextArea);

      // Only show toast on desktop
      if (width > screenSizes.sm && typeof updateToastState === "function") {
        updateToastState(t("successfulCopy"), SUCCESS_TOAST_INTENT);
      }

      if (fromDrawer) {
        // Close the drawer if the link was opened from the drawer
        toggleDrawer();
      }

    } catch (error: any) {
      // Log error
    }
  }, [message, intent]);


  return (<>
    <MenuItem icon={<CopyLinkIcon />} className={className} onClick={() => { copyToClipboard(cardDeeplink) }}>{t("copyLink")}</MenuItem>
    <MenuItem icon={<PeopleTeamIcon />} className={className} onClick={() => { shareToTeams(cardDeeplink, shareToTeamsMsg, preview) }}>
      {t("shareInTeams")}
    </MenuItem>
  </>
  )
};

