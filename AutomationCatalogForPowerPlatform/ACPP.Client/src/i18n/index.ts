// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import config from '../config';

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: config.localizationPath
        },
        fallbackLng: 'en-us',
        debug: false,
        ns: [],
        load: 'currentOnly',
        lowerCaseLng: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;

