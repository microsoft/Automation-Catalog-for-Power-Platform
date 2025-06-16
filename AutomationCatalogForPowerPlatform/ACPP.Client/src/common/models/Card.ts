// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Interface to define the structure of a card info object
export interface Card {
    // Unique name of the card
    cardUniqueName: string;
  
    // Title of the card to be displayed
    cardTitle: string;
  
    // Brief description of the card
    cardDescription: string;
  
    // Detailed description of the card
    cardLongDescription: string;
  
    // Category the card belongs to (e.g. "Calendar Management", "Email Management", etc.)
    cardCategory: string;
  
    // URL of the automation the card is related to
    automationUrl: string;
  
    // Optional URL for the card's icon
    cardIconUrl?: string;
  
    // Type of the card (e.g. "Automation", "App", etc.)
    cardType: string;
  
    // Optional ID of the template the card is based on
    templateId?: string;
  
    // Optional order of display for the card
    cardDisplayOrder?: number;
    
    // Optional number of times the card has been clicked
    noOfClicks?: number;
  
    // Keywords to help search for the card
    cardKeywords: string;
  
    // Subheader of the card
    cardSubheader: string;
  
    // Estimated time savings the card provides
    cardTimeSavings: number;
  
    // Time savings unit
    cardTimeSavingsUnit: string;
  
    // Frequency of the card's data updates
    cardFrequency: string;
    
    // Image URL
    cardImageUrl: string;
    
    // Video URL
    cardVideoUrl: string;
  
    // Minimum required environment for template represented by card
    powerAutomateEnvironment?: string;
  
    // Flag to mark card as new
    isNew: boolean;
  
    // Flag to mark card as image card
    isFeatured: boolean;
  }
  
