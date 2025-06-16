// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Enum for representing the types of events.
 */
export enum EventTypes {
  /** An event related to the application. */
  APP_EVENT = 'APP_EVENT',

  /** An event related to user actions. */
  USER_EVENT = 'USER_EVENT',

  /** An error event. */
  ERROR = 'ERROR',
}

/**
 * Enum for representing the severity level of an exception or error.
 */
export enum SeverityLevel {
  /** Represents a verbose level of severity. */
  Verbose = 0,

  /** Represents an informational level of severity. */
  Information = 1,

  /** Represents a warning level of severity. */
  Warning = 2,

  /** Represents an error level of severity. */
  Error = 3,

  /** Represents a critical level of severity. */
  Critical = 4,
}

/**
 * Interface representing telemetry data.
 */
export interface ITelemetry {
  /** The type of event. */
  eventType: EventTypes;

  /** The start time of the event. */
  startTime?: number;

  /** The end time of the event. */
  endTime?: number;

  /** The name of the event. */
  eventName: string;

  /** Additional details about the event. */
  eventDetails?: any;

  /** The total time duration of the event. */
  totalTime?: number;

  /** A custom session ID associated with the event. */
  customSessionId?: string;
}

/**
 * Interface representing information about a Teams tab.
 */
export interface ITeamsTabInfo {

  /** The user associated with the tab. */
  tabUser: string | undefined;

  /** The session ID of the Teams app. */
  teamsSession: string | undefined;

  /** The environment in which the app is running. */
  appEnvironment: string;
}

/**
 * Interface representing a telemetry service.
 */
export interface IUTPService {
  /** Function to track events. */
  TrackEvent: (event: string, otherData?: ITelemetry) => void;

  /** Function to track exceptions. */
  TrackException: (error: any, severityLevel?: any, otherData?: ITelemetry) => void;
}

