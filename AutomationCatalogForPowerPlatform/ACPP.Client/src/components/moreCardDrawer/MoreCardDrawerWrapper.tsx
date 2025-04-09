import React, { useState } from 'react';

import { Button, mergeClasses } from '@fluentui/react-components';
import { MoreHorizontal16Regular } from '@fluentui/react-icons';

import MoreCardDrawer from './MoreCardDrawer';
import { useStyles } from './MoreCardDrawerWrapper.styles';
import { SolutionTemplateCard } from '../../common/models/SolutionTemplateCard';

interface WrapperProps {
    cardData: SolutionTemplateCard,
    preview: boolean,
    message: string
}

export const MoreCardDrawerWrapper: React.FC<WrapperProps> = ({ cardData, preview, message }: WrapperProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const styles = useStyles();
    const toggleDrawer = () => {
        setIsDrawerOpen((prevState) => !prevState);
    };

    return (
        <div className={mergeClasses(styles.moreCardMenu)}>
            <Button icon={<MoreHorizontal16Regular />} onClick={toggleDrawer} appearance="transparent" />
            <MoreCardDrawer
                isOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                cardData={cardData}
                preview={preview}
                message={message}
            />
        </div >);
};