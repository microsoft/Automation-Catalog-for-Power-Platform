// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Suspense, useCallback, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import AppContainer from './components/appContainer/AppContainer';
import './index.css';
import { FluentProvider } from '@fluentui/react-components';
import { useEffect } from 'react';
import { app } from '@microsoft/teams-js';
import { useTeamsUserCredential } from '@microsoft/teamsfx-react';
import { TeamsFxContext } from './common/contexts/TeamsFxContext';
import config from './config';
import { QueryClient, QueryClientProvider } from 'react-query';
import './i18n';
import i18n from './i18n';
import { AppContext } from './common/contexts/AppContext';
import { CenteredSpinner } from './components/centeredSpinner/centeredSpinner';
import { DEEPLINK_CAMPAIGNID, DEEPLINK_CARDUNIQUENAME, DEEPLINK_SHOWCARDPREVIEW, DEEPLINK_SOURCE, DEEPLINK_TARGETCOMPONENTID } from './common/helpers/Constants';
import { customParse } from './common/helpers/CardDeeplinkHelper';
import { DeepLinkContext } from './common/contexts/DeeplinkContext';
import { EventTypes, ITeamsTabInfo } from './common/models/LoggingServiceTypes';
import { LoggerContext } from './common/contexts/LoggerContext';
import { useLoggingService } from './hooks/useLoggingService';

/**
 * The main app which handles the initialization of the app
 */
const Main = () => {
  const { trackEvent, trackException, setCurrentPage, setTabInfo } = useLoggingService();
  const [appEnv, setAppEnv] = useState<string>("prod");
  const [deepLinkInfo, setDeepLinkInfo] = useState<any>({
    cardUniqueName: undefined,
    source: undefined,
    campaignId: undefined,
    targetComponentId: undefined,
  });

  const { loading, theme, themeString, teamsUserCredential, context } = useTeamsUserCredential({
    initiateLoginEndpoint: new URL(`${config.authStartPage!}`, window.location.href).href,
    clientId: config.clientId!,
  });

  useEffect(() => {
    if (context?.app?.locale && context.app.locale !== i18n.language) i18n.changeLanguage(context.app.locale);
  }, [context]);

  useEffect(() => {
    !loading &&
      app
        .initialize()
        .then(() => {
          // Hide the loading indicator
          app.notifyAppLoaded();
          app.notifySuccess();
          app.getContext().then((context) => {
            if (context?.page?.subPageId) {
              const subPageIdJson = extractsubPageIdJson(context?.page?.subPageId);
              if (subPageIdJson) {
                const deepLinkData = {
                  cardUniqueName: subPageIdJson[DEEPLINK_CARDUNIQUENAME] ?? subPageIdJson[DEEPLINK_SHOWCARDPREVIEW],
                  source: subPageIdJson[DEEPLINK_SOURCE],
                  campaignId: subPageIdJson[DEEPLINK_CAMPAIGNID],
                  targetComponentId: subPageIdJson[DEEPLINK_TARGETCOMPONENTID],
                };
                setDeepLinkInfo(deepLinkData);
              }
            }
            const tabInfo: ITeamsTabInfo = {
              tabUser: context.user?.id,
              teamsSession: context.app.sessionId,
              appEnvironment: appEnv
            };
            setTabInfo(tabInfo);
            trackEvent("SESSION_START",
              {
                eventName: "UserSessionStart",
                eventType: EventTypes.USER_EVENT,
                eventDetails: {
                  TeamsSessionId: context.app.sessionId,
                  UserId: context.user?.id
                }
              }
            )
          });
        })
        .catch((e) => {
          app.notifyFailure(e);
        });
  }, [loading, appEnv, extractsubPageIdJson, setTabInfo, trackEvent]);

  useEffect(() => {
    const urlWithParams = new URL(window.location.href);
    if (urlWithParams.searchParams.size > 0) {
      const env = urlWithParams.searchParams.get("env");
      if (env) {
        setAppEnv(env);
      }
    }
  }, []);

  const queryClient = useMemo(() => {
    return new QueryClient();
  }, []);

  const extractsubPageIdJson = useCallback((subPageId: string) => {
    let subPageIdJson: any;
    if (subPageId.includes("'")) {
      subPageIdJson = JSON.parse(subPageId.replace(/'/g, '"'));
    }
    else {
      subPageIdJson = customParse(subPageId.replace(/'/g, ''));
    }
    return subPageIdJson;
  }, []);

  const renderContent = useCallback(() => {
    return teamsUserCredential ? (
      <Suspense fallback={<CenteredSpinner />}>
        <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential, context }}>
          <FluentProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <AppContext.Provider value={{ appEnv }}>
                <DeepLinkContext.Provider value={{ ...deepLinkInfo, clearContext: setDeepLinkInfo }} >
                  <LoggerContext.Provider value={{ trackEvent, trackException, setCurrentPage }}>
                    <AppContainer />
                  </LoggerContext.Provider>
                </DeepLinkContext.Provider>
              </AppContext.Provider>
            </QueryClientProvider>
          </FluentProvider>
        </TeamsFxContext.Provider >
      </Suspense>
    ) : (
      <CenteredSpinner />
    );
  }, [teamsUserCredential, theme, themeString, context, queryClient, appEnv, deepLinkInfo, trackEvent, trackException, setCurrentPage]);

  return renderContent();
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Main />);

