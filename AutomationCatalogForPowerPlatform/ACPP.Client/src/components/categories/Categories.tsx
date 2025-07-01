// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useMemo } from 'react';

import { Accordion, AccordionItem, AccordionToggleEventHandler, Subtitle1, mergeClasses } from '@fluentui/react-components';
import { useTranslation } from 'react-i18next';
import { CategoryCard } from '../../common/models/Category';
import { CategoriesProps } from './CategoriesProps';
import { useStyles } from './Categories.styles';
import { CardCarousel } from '../cardCarousel/CardCarousel';

const Categories: React.FC<CategoriesProps> = (props: CategoriesProps) => {
  const { t } = useTranslation('Categories');
  const styles = useStyles();
  const [accordionOpenItems, setAccordionOpenItems] = React.useState<number[]>([]);

  const categoryCards: CategoryCard[] = useMemo(() => {
    const categories: CategoryCard[] = [];
    props.cards.forEach((card) => {
      //check if categoryCards already has the category
      const categoryIndex = categories.findIndex((category) => category.categoryTitle === card.cardCategory);
      if (categoryIndex > -1) {
        //category already exists, push the card to the category
        categories[categoryIndex].cards.push(card);
      } else {
        //category doesn't exist, create a new category and push the card
        categories.push({ categoryTitle: card.cardCategory, cards: [card] });
      }
    });
    return categories.sort((a, b) => a.categoryTitle.localeCompare(b.categoryTitle));
  }, [props.cards]);


  React.useEffect(() => {
    setAccordionOpenItems([...Array(categoryCards?.length).keys()]);
  }, []);

  const accordionOnToggle: AccordionToggleEventHandler<number> = (event, data) => {
    setAccordionOpenItems(data.openItems);
  }

  return (
    <div className={mergeClasses(styles.root, props.className)}>
      <div>
        <section className={styles.section}>
          <Subtitle1 block className={styles.title}>
            {t('browseByCategoryTitle')}
          </Subtitle1>
        </section>
        <div>
          <Accordion multiple={true} collapsible={true} onToggle={accordionOnToggle} openItems={accordionOpenItems} className={styles.accordion}>
            {categoryCards.map((category: CategoryCard, index: number) => (
              <AccordionItem value={index} key={index}>
                <CardCarousel cards={category.cards} headerTitle={category.categoryTitle} typeIsAccordion isOpen={accordionOpenItems.includes(index)} searchSelectedCategories={[category.categoryTitle]} />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Categories;

