export interface SolutionTemplateCard {
    
    // Unique id of the card
    solutionTemplateUniqueId: string
    
    // Id of the current template version
    solutionApplicationsId: string;
  
    // Title of the card to be displayed
    cardTitle: string;
  
    // Brief description of the card
    cardDescription: string;

    // Image URL
    cardImageUrl: string;

    // Video URL
    cardVideoUrl: string;

    // Icon URL
    cardIconUrl: string;

    // Flag to mark card as featured card
    isFeatured: boolean;
    
    // Category the card belongs to (e.g. "Calendar Management", "Email Management", etc.)
    cardCategory: string;
    
    // Optional number of times the card has been clicked
    noOfClicks?: number;
  
    // Flag to mark card as new
    isNew: boolean;
}