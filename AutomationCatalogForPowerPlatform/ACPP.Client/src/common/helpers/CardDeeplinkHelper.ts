// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import config from "../../config";

/**
 * Get the deeplink of the card
 * @param  {String} cardUniqueName Template ID of the card
 */
export const getCardDeeplink = (cardUniqueName: string): string => {
    return `https://teams.microsoft.com/l/entity/${config.teamsAppId}/hometab?context={"subEntityId":"{'showCardPreview':'${cardUniqueName}','source':'Teams'}"}`
};

export const customParse = (str: string) => {
    return str
        .slice(1, -1) // Remove the outer curly braces
        .split(',')
        .reduce((result, pair) => {
            const [key, value] = pair.split(':').map(item => item.trim());
            result[key] = value;
            return result;
        }, {});
}  

