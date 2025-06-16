// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
export const getQueryStringParam = (field: string, url?: string): string | null => {
  url = url ?? window.location.href;
  const searchParams = new URLSearchParams(url.split('?')[1]);
  return searchParams.get(field) || null;
};

