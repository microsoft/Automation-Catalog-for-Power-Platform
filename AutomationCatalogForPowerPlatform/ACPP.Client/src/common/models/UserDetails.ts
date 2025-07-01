// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface UserDetails {
    displayName?: string;
    userId?: string;
    userEmail?: string;
    lastVistTime?: Date;
    isTCAConsumerGroupMember?: boolean;
    teamsNotificationsSubscribed?: boolean;
    emailsSubscribed?: boolean;
    isFirstVisit?: boolean;
    personalDevEnvId?: string;
}
