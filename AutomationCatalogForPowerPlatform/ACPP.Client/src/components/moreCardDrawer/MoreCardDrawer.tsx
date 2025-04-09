import React from 'react';

import { Body1, MenuList } from '@fluentui/react-components';

import Drawer from '../../common/controls/Drawer/Drawer';
import { MoreCardMenuItems } from '../moreCardMenu/MoreCardMenu';
import { ShareToTeamsMenuItems } from '../shareToTeams/ShareToTeams';
import { useStyles } from './MoreCardDrawer.styles';
import { MoreCardDrawerProps } from './MoreCardDrawerProps';

const MoreCardDrawer: React.FC<MoreCardDrawerProps> = ({
    cardData,
    preview,
    message,
    isOpen,
    toggleDrawer
}) => {
    const styles = useStyles();

    return (
        <Drawer open={isOpen} onClose={toggleDrawer} direction="bottom" size={200}>
            <Body1 truncate={true} wrap={false} className={styles.cardTitle}>{cardData.cardTitle}</Body1>
            <div className={styles.scrollContainer}>
                <MenuList data-testid='moreMenu' style={{ "height": "fit-content" }}>
                    <MoreCardMenuItems className={styles.menuItem} cardData={cardData} />
                    <ShareToTeamsMenuItems className={styles.menuItem} cardUniqueName={cardData.solutionTemplateUniqueId} preview={preview} message={message} fromDrawer={true} toggleDrawer={toggleDrawer} setShareButtonText={false} />
                </MenuList>
            </div>
        </Drawer>
    );
};

export default React.memo(MoreCardDrawer);