// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';

import { Text, Tooltip } from '@fluentui/react-components';
import { Card, CardHeader, CardPreview } from '@fluentui/react-components';
import { CategoryProps } from './CategoryProps';
import { useStyles } from './Category.styles';

const Category: React.FC<CategoryProps> = ({ category, onClick }: CategoryProps) => {
  const styles = useStyles();

  return (
    <div key={category.categorySortOrder}>
      <Card className={styles.card} onClick={onClick} data-testid="categoryCard">
        <CardPreview className={styles.cardPreview}>
          <img alt={category.categoryTitle} src={category.categoryIcon} className={styles.smallRadius} />
        </CardPreview>
        <CardHeader
          header={
            <Tooltip content={category.categoryTitle} relationship="label" positioning={'below'}>
              <Text truncate align="center" weight="semibold" className={styles.text}>
                {category.categoryTitle}
              </Text>
            </Tooltip>
          }
          className={styles.cardHeader}
        />
      </Card>
    </div>
  );
};

export default Category;

