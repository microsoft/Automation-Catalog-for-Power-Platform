import { Skeleton, SkeletonItem, Card, CardPreview, mergeClasses } from '@fluentui/react-components';
import { useStyles } from './CategoriesSkeleton.styles';
import { useScreenSize } from '../../hooks/useScreenSize';
import { screenSizes } from '../../common/helpers/Constants';

export const CategoriesSkeleton = (): JSX.Element => {
  const styles = useStyles();
  const { width } = useScreenSize();

  const items =
    width >= screenSizes.lg
      ? 5 // Display 5 skeleton items for large screens
      : width >= screenSizes.md
        ? 4 // Display 4 skeleton items for medium screens
        : width >= screenSizes.sm
          ? 3 // Display 3 skeleton items for tablet screens
          : 2; // Display 2 skeleton items for mobile screens
  return (
    <Skeleton animation="pulse" data-testid="loading-skeleton">
      <div className={styles.wrapper}>
        {[...Array(items)].map((e, i) => (
          <Card key={`key_${i}`} className={styles.card} aria-roledescription="card with image preview and text">
            <div className={mergeClasses(styles.wrapper, styles.cardWrapper)}>
              <SkeletonItem shape="square" size={24} className={styles.skeletonItem} />
              <CardPreview>
                <div>
                  <SkeletonItem className={styles.cardPreview} />
                </div>
              </CardPreview>
            </div>
          </Card>
        ))}
      </div>
    </Skeleton>
  );
};
