import { MessageBarIntent } from "@fluentui/react-components";

export interface AnnouncementBannerData {

    // Flag to set the announcement
    setAnnouncement: boolean;

    // Type of announcement
    announcementType: MessageBarIntent;

    // Message to be displayed in the announcement banner
    announcementMessage: string;

    // URL of the link to be added at the end of the announcement
    announcementLinkUrl?: string;

    // Text of the link to be added at the end of the announcement
    announcementLinkText?: string;
}