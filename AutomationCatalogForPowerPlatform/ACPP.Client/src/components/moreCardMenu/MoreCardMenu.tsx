// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
    Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger, mergeClasses
} from '@fluentui/react-components';
import {
    bundleIcon, Info16Filled, Info16Regular, MoreHorizontal16Regular, PhotoFilterFilled,
    PhotoFilterRegular
} from '@fluentui/react-icons';

import { IMoreCardMenuProps } from './IMoreCardMenuProps';
import { useStyles } from './MoreCardMenu.style';

const InfoIcon = bundleIcon(Info16Filled, Info16Regular);
const PhotoFilterIcon = bundleIcon(PhotoFilterFilled, PhotoFilterRegular);

export const MoreCardMenu: React.FC<IMoreCardMenuProps> = ({ className, cardData }: IMoreCardMenuProps) => {
    const styles = useStyles();

    return (
        <div className={mergeClasses(styles.moreCardMenu, className)}>
            <Menu>
                <MenuTrigger disableButtonEnhancement>
                    <MenuButton icon={<MoreHorizontal16Regular aria-label="More" />} size="medium" className={styles.menuButton} data-testid='moreButton' />
                </MenuTrigger>

                <MenuPopover>
                    <MenuList data-testid='moreMenu'>
                        <MoreCardMenuItems cardData={cardData} />
                    </MenuList>
                </MenuPopover>
            </Menu>
        </div >
    );
};

export const MoreCardMenuItems: React.FC<IMoreCardMenuProps> = ({ className, cardData }: IMoreCardMenuProps) => {
    const { t } = useTranslation(['Common']);
    const navigate = useNavigate();
    return (<>
        <MenuItem icon={<InfoIcon />} className={className} onClick={() => { navigate('/ItemDetails', { state: { cardUniqueName: cardData.solutionTemplateUniqueId } }) }}>{t('seeDetails')}</MenuItem>
        <MenuItem icon={<PhotoFilterIcon />} className={className} onClick={() => { navigate('/Search', { state: { queryText: "", selectedCategories: [cardData.cardCategory] } }) }}>{t('relatedItems')}</MenuItem>
    </>)
}

