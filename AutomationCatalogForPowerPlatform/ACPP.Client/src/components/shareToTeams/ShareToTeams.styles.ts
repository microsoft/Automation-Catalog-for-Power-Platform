// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
    shareToTeams: {
        display: 'inline-block'
    },
    menuButton: {
        ...shorthands.outline('transparent'),
        ...shorthands.borderStyle('none'),
        ...shorthands.borderRadius('2px'),
        boxSizing: 'border-box',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        ':hover': {
            color: tokens.colorNeutralForeground2BrandHover,
            backgroundColor: 'transparent'
        },
        fontSize: '13px', 
        fontWeight: tokens.fontWeightRegular,
    },
});
