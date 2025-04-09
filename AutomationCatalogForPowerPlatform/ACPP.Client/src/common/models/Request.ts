/**
 * Represents a sort property for sorting results.
 * @interface SortProperty
 */
export interface SortProperty {
  /**
   * The name of the attribute/field to sort by.
   *
   * @type {string}
   * @memberof SortProperty
   */
  name: string;

  /**
   * Specifies if the sort order should be descending.
   *
   * @type {boolean}
   * @memberof SortProperty
   */
  isDescending: boolean;
}

/**
 * Enumerates common HTTP status codes.
 */
export enum HTTP_STATUS_CODES {
  /**
   * The request succeeded.
   */
  OK = 200,

  /**
   * The request was malformed or invalid.
   */
  BAD_REQUEST = 400,

  /**
   * The request was not authorized.
   */
  UNAUTHORIZED = 401,

  /**
   * The requested resource was not found.
   */
  NOT_FOUND = 404,

  /**
   * An internal server error occurred.
   */
  INTERNAL_SERVER_ERROR = 500,
}
