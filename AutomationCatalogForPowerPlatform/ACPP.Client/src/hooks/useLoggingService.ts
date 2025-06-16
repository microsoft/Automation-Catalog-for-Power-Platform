// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ITeamsTabInfo, ITelemetry, SeverityLevel } from "../common/models/LoggingServiceTypes";
import config from "../config";
import { useEffect, useState } from "react";

export const useLoggingService = () => {
    const [appInsights, setAppInsights] = useState<ApplicationInsights | null>(null);
    const [tabInfo, setTabInfo] = useState<ITeamsTabInfo | null>(null);
    const [currentPage, setCurrentPage] = useState<string>('homepage');

    useEffect(() => {
        if (appInsights) {
            return;
        }
        const _appInsights = new ApplicationInsights({
            config: {
                connectionString: config.aiConnectionString,
            },
        });
        _appInsights.addTelemetryInitializer((envelope) => {
            if (envelope.baseType === 'RemoteDependencyData' && envelope.baseData?.target === "https://m.clarity.ms/collect") {
                return false;
            }
            return true;
        });
        _appInsights.loadAppInsights();
        setAppInsights(_appInsights);
    }, []);

    /**
    * Creates the payload with common properties to be logged.
    * @param data The data to be logged.
    * @returns The payload with common properties.
    */
    const _createPayloadWithCommonProps = (data: any): any => ({
        ...data,
        sourcePage: currentPage,
        ...tabInfo,
    });

    const trackEvent = (event: string, otherData?: ITelemetry) => {
        if (process.env.REACT_APP_ENV === 'development') {
            console.log('Tracking Automation Catalog for Power Platform event -', event, otherData);
        }
        const payload: any = _createPayloadWithCommonProps(otherData);
        appInsights?.trackEvent({ name: event, properties: payload });
    };

    const trackException = (error: Error, severityLevel?: SeverityLevel, otherData?: ITelemetry): void => {
        if (process.env.REACT_APP_ENV === 'development') {
            console.error('Tracking Automation Catalog for Power Platform exception -', error, severityLevel, otherData);
        }
        const payload: any = _createPayloadWithCommonProps(otherData);
        appInsights?.trackException({ exception: error, severityLevel, properties: payload });
    };

    return { trackEvent, trackException, setCurrentPage, setTabInfo };
};
