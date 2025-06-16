// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Direction } from './Drawer';

export const useStyles = makeStyles({
  drawer: {
    display: 'block',
  },
  overlay: {
    display: 'none',
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  container: {
    position: 'fixed',
    visibility: 'hidden',
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.transition('all', 'inherit'),
    boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    ...shorthands.padding('25px'),
  },
  activeContainer: {
    visibility: 'visible',
    transform: 'translate3d(0, 0, 0) !important',
  },
  scrollContainer: {
    maxHeight: '100%',
  },
});

export const getDirectionStyle = (dir: Direction, size: number): React.CSSProperties => {
  switch (dir) {
    case 'left':
      return {
        top: 0,
        left: 0,
        transform: 'translate3d(-100%, 0, 0)',
        width: size,
        height: '100vh',
      };
    case 'right':
      return {
        top: 0,
        right: 0,
        transform: 'translate3d(100%, 0, 0)',
        width: size,
        height: '100vh',
      };
    case 'bottom':
      return {
        left: 0,
        right: 0,
        bottom: 0,
        transform: 'translate3d(0, 100%, 0)',
        width: '100%',
        height: size,
      };
    case 'top':
      return {
        left: 0,
        right: 0,
        top: 0,
        transform: 'translate3d(0, -100%, 0)',
        width: '100%',
        height: size,
      };
    default:
      return {};
  }
};

