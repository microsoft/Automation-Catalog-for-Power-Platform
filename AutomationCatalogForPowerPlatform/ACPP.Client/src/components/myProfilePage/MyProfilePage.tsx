import * as React from 'react';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
    LargeTitle, Link, mergeClasses, Table, TableBody, TableCell, TableCellLayout, TableHeader,
    TableHeaderCell, TableRow, Text
} from '@fluentui/react-components';

import { useCommonStyles } from '../../common.styles';
import { AppContext } from '../../common/contexts/AppContext';
import { DisplayCanvas } from '../../common/controls/DisplayCanvas/DisplayCanvas';
import { RootCanvas } from '../../common/controls/RootCanvas/RootCanvas';
import { screenSizes } from '../../common/helpers/Constants';
import { useGetUserCatalogItems } from '../../hooks/useGetUserCatalogItems';
import { useScreenSize } from '../../hooks/useScreenSize';
import { CenteredSpinner } from '../centeredSpinner/centeredSpinner';
import { useStyles } from './MyProfilePage.styles';

const calculateTimeSavings = (item) => {
  const { mspcat_CatalogItem, flowRuns, noOfDaysWithAtleastOneSuccessfulRun, noOfWeeksWithAtleastOneSuccessfulRun } = item;
  const timeSavingTypeValue = mspcat_CatalogItem?.timeSavingType;
  const timeSavingsValue = parseFloat(mspcat_CatalogItem?.timeSavingValue || "0");

  switch (Number(timeSavingTypeValue)) {
    case 919440000: // Per run
      return timeSavingsValue * (flowRuns || 0);
    case 919440001: // Per day
      return timeSavingsValue * (noOfDaysWithAtleastOneSuccessfulRun || 0);
    case 919440002: // Per week
      return timeSavingsValue * (noOfWeeksWithAtleastOneSuccessfulRun || 0);
    default:
      return 0;
  }
};

const formatTimeSavings = (timeSavings) => {
  return (timeSavings < 600 && timeSavings > 0)
    ? `${(timeSavings / 60).toFixed(1)}`
    : `${(timeSavings / 60).toFixed(0)}`;
};

const calculateTotalTimeSavings = (userCatalogItemsData) => {
  const totalMinutes = userCatalogItemsData?.reduce((sum, item) => {
    return sum + calculateTimeSavings(item);
  }, 0) || 0;

  const hours = Math.floor(totalMinutes / 60);
  return hours < 10 ? `${(totalMinutes / 60).toFixed(1)}` : `${hours}`;
};

const TableRowComponent = ({ item, styles, width, t }) => {
  const { mspcat_CatalogItem, installedOn, flowUrl } = item;
  const solutionName = mspcat_CatalogItem?.solutionName;
  const timeSavingTypeValue = mspcat_CatalogItem?.timeSavingType;
  const timeSavingsValue = parseFloat(mspcat_CatalogItem?.timeSavingValue || 0);

  const installedDate = new Date(installedOn);
  const installedOnFormatted = installedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const timeSavings = calculateTimeSavings(item);
  const formattedTimeSavings = formatTimeSavings(timeSavings);
  const timeSavingType = ['run', 'day', 'week'][Number(timeSavingTypeValue) - 919440000] || '';
  const timeSavingsRate = timeSavingsValue === 0 ? "NA" : `${timeSavingsValue} ${t('min')} ${timeSavingType}`;

  return width > screenSizes.md ? (
    <TableRow aria-label={`Row for solution ${solutionName}`}>
      {[
        { content: solutionName, ariaLabel: 'Solution Name' },
        { content: installedOnFormatted, ariaLabel: 'Installed On' },
        { content: formattedTimeSavings, ariaLabel: 'Time Savings' },
        { content: timeSavingsRate, ariaLabel: 'Time Savings Rate' },
        {
          content: (
            <div className={styles.linkColor}>
              <Link href={flowUrl} target="_blank" rel="noopener noreferrer" aria-label={`Manage solution ${solutionName}`}>Manage</Link>
            </div>
          ),
          ariaLabel: 'Manage Link',
        },
      ].map((cell, index) => (
        <TableCell key={index} aria-label={cell.ariaLabel}>
          <TableCellLayout>
            <div>{cell.content}</div>
          </TableCellLayout>
        </TableCell>
      ))}
    </TableRow>
  )
    :
    (
      <div className={styles.listContainer} aria-label={`List item for solution ${solutionName}`}>
        <TableRow>
          <div className={styles.listRow}>
            <div className={styles.listRowHeader}>
              <Text className={styles.listSolutionName}>{solutionName}</Text>
              <Text className={styles.listTimeSavings}>{t('saved')} {formattedTimeSavings} {t('rate')} {timeSavingsRate}</Text>
            </div>
            <Link href={flowUrl} target="_blank" rel="noopener noreferrer" aria-label={`Manage solution ${solutionName}`}>Manage</Link>
          </div>
        </TableRow>
      </div>
    );
};

export const MyProfilePage: React.FC = () => {
  const { appEnv } = useContext(AppContext);
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const { t } = useTranslation(['MyProfilePage', 'Common']);
  const { isLoading, data: userCatalogItemsData } = useGetUserCatalogItems(appEnv!);
  const { width } = useScreenSize();

  const tableRows = useMemo(() => {
    if (!userCatalogItemsData) return null;    
    return userCatalogItemsData
      ?.filter(item => item.solutionId)
      .sort((a, b) => new Date(b.installedOn).getTime() - new Date(a.installedOn).getTime())
      .map((item, index) => (
      <TableRowComponent key={item.solutionId || index} item={item} styles={styles} width={width} t={t} />
      ));
  }, [styles, t, userCatalogItemsData, width]);

  const totalTimeSavings = useMemo(() => calculateTotalTimeSavings(userCatalogItemsData), [userCatalogItemsData]);

  return (
    <RootCanvas>
      <div className={styles.homeHeader}>
        <LargeTitle className={styles.headerText} aria-label={t('myProfile')}>{t('myProfile')}</LargeTitle>
      </div>
      <DisplayCanvas>
        <div className={styles.automationsData}>
          {isLoading ? (
            <CenteredSpinner classNames={commonStyles.padding5} aria-label="Loading spinner" />
          ) : userCatalogItemsData?.filter(item => item.solutionId).length ? (
            <>
              <div className={styles.myProfileContainer}>
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <Text className={styles.statHeader} aria-label={t('totalTimeSavings')}>{t('totalTimeSavings')}</Text>
                    <div className={styles.statNumberContainer}>
                      <Text className={styles.statNumber} aria-label={`${totalTimeSavings} ${t('hours')}`}>{totalTimeSavings}</Text>
                      {width > screenSizes.md ?
                        <Text className={styles.statHours}>{t('hours')}</Text> :
                        <Text className={styles.statHours}>{t('h')}</Text>
                      }
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <Text className={mergeClasses(styles.statHeader, styles.statHeaderMobile)} aria-label={t('automations')}>{t('automations')}</Text>
                    <Text className={styles.statNumber} aria-label={`${userCatalogItemsData?.filter(item => item.solutionId).length} automations`}>
                      {userCatalogItemsData?.filter(item => item.solutionId).length}
                    </Text>
                  </div>
                </div>
                <Text className={styles.installationDataPeriod} aria-label={t('installationDataPeriod')}>{t('installationDataPeriod')}</Text>
                <Text className={styles.automationsText} aria-label={t('installedAutomations')}>{t('installedAutomations')}</Text>
                <Table aria-label="Automation details table" className={mergeClasses(styles.text, styles.table)}>
                  {width > screenSizes.md ?
                    <>
                      <TableHeader className={styles.headerTableText}>
                        <TableRow>
                          <TableHeaderCell aria-label="Name">{t('name')}</TableHeaderCell>
                          <TableHeaderCell aria-label="Installed">{t('installed')}</TableHeaderCell>
                          <TableHeaderCell aria-label="Time Savings">{t('timeSavings')}</TableHeaderCell>
                          <TableHeaderCell aria-label="Time Savings Rate">{t('timeSavingsRate')}</TableHeaderCell>
                          <TableHeaderCell aria-label="Manage automation link">{t('flowUrl')}</TableHeaderCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>{tableRows}</TableBody>
                    </>
                    :
                    <div className={styles.listContainer} aria-label="Automation list">
                      {tableRows}
                    </div>
                  }
                </Table>
              </div>
            </>
          ) : (
            <Text className={styles.noDataText} aria-label={t('noData')}>{t('noData')}</Text>
          )}
        </div>
      </DisplayCanvas>
    </RootCanvas>
  );
};
