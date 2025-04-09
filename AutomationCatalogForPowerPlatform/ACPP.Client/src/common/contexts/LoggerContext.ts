import { createContext } from 'react';
import { ITelemetry } from '../models/LoggingServiceTypes';

export const LoggerContext = createContext<{
    trackEvent: (event: string, otherData?: ITelemetry) => void;
    trackException: (error: Error, severityLevel?: number, otherData?: ITelemetry) => void;
    setCurrentPage: (currentPage: string) => void;
}>({
    trackEvent: (event: string, otherData?: ITelemetry) => { },
    trackException: (error: Error, severityLevel?: number, otherData?: ITelemetry) => { },
    setCurrentPage: (currentPage: string) => { }
});
