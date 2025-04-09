/**
 * Interface for properties of the ShareToTeams component.
 */
export interface IShareToTeamsProps {
  /**
   * CSS class name to be applied to the component.
   * Optional property.
   */
  className?: string;

  /**
   * Unique name of the card
   */
  cardUniqueName: string;

  /**
   * Default message to be loaded in the compose box.
   */
  message: string;

  /**
   * Flag indicating whether to show a preview of the shared URL.
   */
  preview: boolean;

  /**
  * Flag indicating whether to display label in the Share Button.
  */
  setShareButtonText: boolean;
}
