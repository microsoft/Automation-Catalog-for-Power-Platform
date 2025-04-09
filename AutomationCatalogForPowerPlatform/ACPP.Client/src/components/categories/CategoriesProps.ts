import { SolutionTemplateCard } from "../../common/models/SolutionTemplateCard";

/**
 * Represents the properties for the Categories component.
 * @interface CategoriesProps
 */
export interface CategoriesProps {
  /**
   * A CSS class name to apply to the Categories component.
   */
  className?: string;
  cards: SolutionTemplateCard[];
}
