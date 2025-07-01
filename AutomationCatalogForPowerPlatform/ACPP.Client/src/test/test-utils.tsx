// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import * as fs from 'fs';
import { ReactElement, Suspense } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const locs = {};
// eslint-disable-next-line array-callback-return
fs.readdirSync('./src/i18n/locales/en-US').map((file) => {
    const loc = require(`../i18n/locales/en-US/${file}`);
    locs[file.replace('.json', '')] = loc;
});

i18n.use(initReactI18next).init({
    ns: [],
    resources: { 'en-us': locs },
    lng: 'en-us',
    lowerCaseLng: true,
    react: {
        useSuspense: false,
        nsMode: "fallback"
    },
    // debug: true
});

const AllTheProviders = ({ children }) => {
    return (
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </Suspense>
        </I18nextProvider >
    )
};

const renderWithProviders = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export { renderWithProviders };
