// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GriffelStyle } from '@fluentui/react-components';

type BreakpointFunction = (
  styles: GriffelStyle
) => Record<string, GriffelStyle>;

interface IBreakpoints {
  /**
   * X-Small devices (portrait phones, less than 576px).
   *
   * @type {BreakpointFunction}
   * @memberof IBreakpoints
   */
  xs: BreakpointFunction;
  /**
   * Small devices (landscape phones, less than 768px).
   *
   * @type {BreakpointFunction}
   * @memberof IBreakpoints
   */
  sm: BreakpointFunction;
  /**
   * Medium devices (tablets, less than 992px).
   *
   * @type {BreakpointFunction}
   * @memberof IBreakpoints
   */
  md: BreakpointFunction;
  /**
   * Large devices (desktops, less than 1200px).
   *
   * @type {BreakpointFunction}
   * @memberof IBreakpoints
   */
  lg: BreakpointFunction;
  /**
   * X-Large devices (large desktops, less than 1400px).
   *
   * @type {BreakpointFunction}
   * @memberof IBreakpoints
   */
  xl: BreakpointFunction;
}

const breakpoints: IBreakpoints = {
  xs: style => {
    return { '@media (max-width: 320px)': style };
  },
  sm: style => {
    return { '@media (max-width: 480px)': style };
  },
  md: style => {
    return { '@media (max-width: 768px)': style };
  },
  lg: style => {
    return { '@media (max-width: 1024px)': style };
  },
  xl: style => {
    return { '@media (max-width: 1280px)': style };
  },
};

export default breakpoints;
