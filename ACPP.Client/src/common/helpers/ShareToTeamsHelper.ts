import { sharing } from '@microsoft/teams-js';
/**
 * Share the card deeplink to Teams
 * @param  {String} shareURL The card deeplink URL to be shared
 * @param  {String} message   The default message to be shared
 * @param  {Boolean} preview   Is the preview version of the API being used
 */
export const shareToTeams = (shareURL: string, message: string, preview: boolean) => {
    sharing.shareWebContent({
        content: [
            {
                type: 'URL',
                url: shareURL,
                message: message,
                preview: preview ?? true,
            },
        ],
    });
};