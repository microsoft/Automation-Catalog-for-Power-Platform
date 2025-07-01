// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands } from '@fluentui/react-components';

import breakpoints from '../../../common/helpers/Breakpoints';
import { DISPLAY_CARD_WIDTH } from '../../../common/helpers/Constants';

export const useStyles = makeStyles({
    noSearchResults: {
        fontSize: '18px',
        fontWeight: 700,
        lineHeight: '20px',
        ...breakpoints.sm({
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
        })
      },
    searchResults: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${DISPLAY_CARD_WIDTH}, 1fr))`,
        gridAutoRows: 'auto',
        gridGap: '1em',
        ...breakpoints.sm({
            display: 'flex',
            ...shorthands.padding('0%'),
            ...shorthands.margin('2%', '-3%', 0, '-3%'),
            flexDirection: 'column',
            ...shorthands.gap(0)
        })
    },
    searchCard: {
        ...breakpoints.sm({
            boxShadow: 'none',
            ...shorthands.borderRadius('none')
        })
    }
});
