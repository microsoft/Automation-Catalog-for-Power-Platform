// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands } from '@fluentui/react-components';

import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
    menuButton: {
        ...shorthands.outline('transparent'),
        ...shorthands.borderStyle('none'),
        ...shorthands.borderRadius('2px'),
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        ':hover': {
            color: 'rgb(91, 95, 199)',
            backgroundColor: 'transparent'
        }
    },
    scrollContainer: {
        maxHeight: '100%',
        overflowY: 'auto',
        ...shorthands.padding('5px', '15px', '5px', 0),
        ...breakpoints.sm({
            height: '210px',
        })
    },
    menuItem: {
        backgroundColor: 'transparent',
        maxWidth: '100%'
    },
    cardTitle: {
        display: 'block'
    }
});

