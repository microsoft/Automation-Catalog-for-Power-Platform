import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import { Spinner } from '@fluentui/react-components';

import { AppContext } from '../../common/contexts/AppContext';
import { LoggerContext } from '../../common/contexts/LoggerContext';
import { UserContext } from '../../common/contexts/UserContext';
import { EventTypes } from '../../common/models/LoggingServiceTypes';
import { UserCatalogItems } from '../../common/models/UserCatalogItems';
import { UserDetails } from '../../common/models/UserDetails';
import { useGetUserBasicData } from '../../hooks/useGetUserBasicData';
import { useGetUserCatalogItems } from '../../hooks/useGetUserCatalogItems';
import { useUpdateLastVisitTime } from '../../hooks/useUpdateLastVisitTime';
import { AHRouter } from '../AhRouter';
import ErrorBox from '../errorBox/errorBox';
import Navbar from '../navbar/Navbar';
import withErrorBoundary from '../withErrorBoundary';
import { useStyles } from './AppContainer.styles';

/**
 * The container which handles the initialization and routing
 * of the app.
 */
const _AppContainer = () => {
  const { trackEvent } = useContext(LoggerContext);
  const classes = useStyles();
  const { t } = useTranslation(['Common']);
  const [userDetails, setUserDetails] = useState<UserDetails>(undefined!);
  const [userCatalogItems, setUserCatalogItems] = useState<UserCatalogItems[]>([]);
  const { appEnv } = useContext(AppContext);

  const {
    isError: userBasicDataError,
    isLoading: userBasicDataIsLoading,
    isLoadingError: userBasicDataIsLoadingError,
    data: userBasicData
  } = useGetUserBasicData(setUserDetails);

  
  const { mutate: updateLastVisit } = useUpdateLastVisitTime();
  const { isError: userCatalogItemsDataError, isLoading: userCatalogItemsDataIsLoading, isLoadingError: userCatalogItemsDataIsLoadingError, data: userCatalogItemsData } = useGetUserCatalogItems(appEnv!);
  useEffect(() => {
    if (!userCatalogItemsDataIsLoading && !userCatalogItemsDataError && !userCatalogItemsDataIsLoadingError && userCatalogItemsData) {
      setUserCatalogItems(userCatalogItemsData);
      trackEvent('USER_CATALOG_ITEMS_LOADED', {
        eventType: EventTypes.APP_EVENT,
        eventName: 'userCatalogItemsLoaded',
        eventDetails: {
          CatalogItemsCount: userCatalogItemsData.length
        }
      });
    }
  }
  , [userCatalogItemsData, userCatalogItemsDataError, userCatalogItemsDataIsLoading, userCatalogItemsDataIsLoadingError]);

  useEffect(() => {
    if (!userBasicDataIsLoading && !userBasicDataError && !userBasicDataIsLoadingError && userBasicData) {
      trackEvent('USER_DETAILS_LOADED', {
        eventType: EventTypes.APP_EVENT,
        eventName: 'userDetailsLoaded',
        eventDetails: {
          HasPDE: !!userBasicData.personalDevEnvId,
          IsFirstVisit: userBasicData.isFirstVisit
        }
      });
      updateLastVisit();
    }
  }, [userBasicDataIsLoading, userBasicDataError, userBasicDataIsLoadingError, userBasicData, updateLastVisit]);

  return (
    <div className={classes.root}>
      {userBasicDataIsLoading ?
        <Spinner />
        :
        userBasicDataError || userBasicDataIsLoadingError ?
          <ErrorBox errorTitle={t("errorMessage")} errorDescription={t("errorMessage")}></ErrorBox>
          :
          <div className="app-content">
            <BrowserRouter>
              <UserContext.Provider value={{ userBasicData: userDetails, userCatalogItems: userCatalogItems }}>
                <Navbar />
                <div id="main-content" className={classes.mainContent}>
                  <AHRouter />
                </div>
              </UserContext.Provider>
            </BrowserRouter>
          </div>
      }
    </div >
  );

}

export default withErrorBoundary(_AppContainer);
