import { SolutionTemplateCard } from "../../common/models/SolutionTemplateCard";

/**
 * Interface for properties of the ShareToTeams component.
 */
export interface IMoreCardMenuProps {
  /**
   * CSS class name to be applied to the component.
   * Optional property.
   */
  className?: string;

  /**
   * The card data to be displayed in the component.
   */
  cardData: SolutionTemplateCard;
}
