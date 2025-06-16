// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useTranslation } from 'react-i18next';

import { Image, mergeClasses, Tag } from '@fluentui/react-components';

import { IHeaderProps } from '../IHeaderProps';
import { useStyles } from './IconHeader.styles';

export const IconHeader: React.FC<IHeaderProps> = ({ cardData, userCatalogItemsData }: IHeaderProps) => {

    const styles = useStyles();
    const { t } = useTranslation("Common");

    return (
        <div className={mergeClasses(styles.cardHeader, styles.cursorHover)}>
            <div className={styles.cardHeaderImage}>
                {cardData.cardIconUrl && (
                    <header className={styles.displayFlex}>
                        <Image className={styles.appIcon} src={cardData.cardIconUrl} alt="Card icon preview" />
                    </header>
                )}
            </div>
            {cardData.isNew &&
                <div className={styles.newTagStyle}>
                    <Tag size="small" shape="rounded" appearance="brand">{t("Common:new")}</Tag>
                </div>}
            {userCatalogItemsData?.filter(item => item.solutionId).some(item => item.mspcat_CatalogItem.solutionName === cardData.cardTitle) &&
                <div className={styles.newTagStyle}>
                    <Tag size="small" shape="circular" appearance="brand">{t("Common:installed")}</Tag>
                </div>}
        </div >
    );
};

