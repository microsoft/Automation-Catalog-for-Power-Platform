// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MessageBarIntent, ToastIntent } from "@fluentui/react-components";

export const EMPTY_STRING = '';
export const screenSizes = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
}

export const DISPLAY_CARD_WIDTH = '230px';
export const DISPLAY_CARD_HEIGHT = '285px';
export const CATEGORY_CARD_WIDTH_DEFAULT = '172px';
export const CATEGORY_CARD_WIDTH_XL = '151px';
export const CATEGORY_CARD_WIDTH_LG = '140px';
export const ICON_CARD_MOBILE_WIDTH = '375px';
export const CARD_CAROUSEL_GAP = '6';

// eslint-disable-next-line no-template-curly-in-string
export const DEEPLINK_BASE_URL = 'https://aka.ms/automationhub?context={"subEntityId":"{\'cardUniqueName\':${cardUniqueName},\'source\':\'Teams\'"}';

enum IntentTypes {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success"
};

export const ERROR_TOAST_INTENT: ToastIntent = IntentTypes.ERROR;
export const WARNING_TOAST_INTENT: ToastIntent = IntentTypes.WARNING;
export const INFO_TOAST_INTENT: ToastIntent = IntentTypes.INFO;
export const SUCCESS_TOAST_INTENT: ToastIntent = IntentTypes.SUCCESS;

export const ERROR_INTENT: MessageBarIntent = IntentTypes.ERROR;
export const WARNING_INTENT: MessageBarIntent = IntentTypes.WARNING;
export const INFO_INTENT: MessageBarIntent = IntentTypes.INFO;
export const SUCCESS_INTENT: MessageBarIntent = IntentTypes.SUCCESS;

export const CentroUrl = {
  Prod: 'https://admin.microsoft.com',
  CI: 'https://admin-ignite.microsoft.com',
  Local: 'https://localhost:443',
};

export const CARD_CAROUSEL_TYPE_ACCORDION: string = "accordion";
export const CARD_CAROUSEL_TYPE_DIV: string = "div";

//remove DEEPLINK_SHOWCARDPREVIEW after few months.... recreate all deeplinks to use cardUniqueName
export const DEEPLINK_SHOWCARDPREVIEW = "showCardPreview"
export const DEEPLINK_CARDUNIQUENAME = "cardUniqueName"
export const DEEPLINK_SOURCE = "source"
export const DEEPLINK_CAMPAIGNID = "campaignId"
export const DEEPLINK_TARGETCOMPONENTID = "targetComponentId";
export const DEEPLINK_FEEDBACK = "showFeedbackMenu";

export const CardCategoryMapping: { [key: string]: string } = {
  "774500000": "Miscellaneous",
  "774500001": "ADO Management",
  "774500002": "Calendar Management",
  "774500003": "Communication",
  "774500004": "Email Management",
  "774500005": "Onboarding",
  "774500006": "Task Management",
  "774500007": "Wellness At Work",
}
