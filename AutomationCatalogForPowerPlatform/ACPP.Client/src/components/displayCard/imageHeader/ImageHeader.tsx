// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CardPreview } from '@fluentui/react-card';
import { Image } from '@fluentui/react-image';
import { IHeaderProps } from '../IHeaderProps';
import { useStyles } from './ImageHeader.styles';
import { mergeClasses } from '@fluentui/react-components';

export const ImageHeader: React.FC<IHeaderProps> = ({ cardData }: IHeaderProps) => {

    const styles = useStyles();

    return (
        <div className={mergeClasses(styles.cursorHover, styles.cardHeader)}>
            {/* Display Image in non-small screens */}
            {cardData.cardImageUrl && (
                <CardPreview className={styles.cardImage}>
                    <Image className={styles.cardHeaderImage} src={cardData.cardImageUrl} alt="Card thumbnail preview" />
                </CardPreview>
            )}
            {/* Display Icon in small screens */}
            {cardData.cardIconUrl && (
                <header>
                    <Image className={styles.cardHeaderIcon} src={cardData.cardIconUrl} alt="Card icon preview" />
                </header>
            )}
        </div>
    );
}
