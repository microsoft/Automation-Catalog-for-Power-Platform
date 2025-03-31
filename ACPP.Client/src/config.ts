import { EMPTY_STRING } from "./common/helpers/Constants";

const appConfig = {
  privacyPolicyLink: 'https://privacy.microsoft.com/en-US/data-privacy-notice',
  termsOfUseLink: 'https://www.microsoft.com/en-us/servicesagreement',
  localizationPath: "/StaticContent/hometab/static/locales/{{lng}}/{{ns}}.json",
  shareIdeasImageUrl: "https://imageassetssa.z5.web.core.windows.net/images/V2.0/ShareIdeas.png",
  ahLogo: "https://imageassetssa.z5.web.core.windows.net/images/V2.0/ahLogo.png",
  catalogInstallUrl: (catalogItemId: string, pdeId: string) =>
    `https://make.preview.powerapps.com/environments/${pdeId}/catalog?autoPopupCardId=${catalogItemId}&powerappsConnections.enableCustomInputControls=true
&powerappsPortal.enableAdditionalEnvironmentVariableOptions=true&powerappsPortal.enableOutlookTypeEnvironmentVariables=true
&powerappsConnections.enableOutlookTypeEnvironmentVariablesInEVPicker=true`,
  pdeCreationInstructionsUrl: "https://aka.ms/ahfaq#how-to-create-your-own-personal-dev-environment",
  ppacUrl: "https://aka.ms/ppac"
};

const config = {
  teamsAppId: process.env.REACT_APP_TEAMS_APP_ID !== '$(teamsAppId)' ? process.env.REACT_APP_TEAMS_APP_ID : EMPTY_STRING,
  clientId: process.env.REACT_APP_CLIENT_ID,
  aiConnectionString: process.env.REACT_APP_AI_CONNECTION_STRING,
  defaultTokenScope: process.env.REACT_APP_DEFAULT_TOKEN_SCOPE,
  adminDefaultEnv: process.env.REACT_APP_ADMIN_ENV !== '$(adminEnvironment)' ? process.env.REACT_APP_ADMIN_ENV : EMPTY_STRING,
  feedbackFormUrl: process.env.REACT_APP_FEEDBACK_FORM_URL !== '$(feedBackFormUrl)' ? process.env.REACT_APP_FEEDBACK_FORM_URL : EMPTY_STRING,
  faqUrl: process.env.REACT_APP_FAQ_URL != '$(faqUrl)' ? process.env.REACT_APP_FAQ_URL : EMPTY_STRING,
  appTitle: 'Automation Catalog for Power Platform',
  authStartPage: 'auth-start.html',
  apiEndpoint: window.location.origin,
  ...appConfig,
};

export default config;
