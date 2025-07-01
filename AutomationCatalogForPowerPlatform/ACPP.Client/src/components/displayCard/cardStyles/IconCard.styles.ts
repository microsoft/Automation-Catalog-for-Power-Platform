// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

import breakpoints from '../../../common/helpers/Breakpoints';
import { DISPLAY_CARD_WIDTH } from '../../../common/helpers/Constants';

export const useStyles = makeStyles({
    cardHeaderText: {
        textOverflow: 'ellipsis',
        '-webkit-line-clamp': "2",
        '-webkit-box-orient': 'vertical',
        ...shorthands.overflow('hidden'),
        display: '-webkit-box',
        minHeight: '2.7em',
        ...breakpoints.sm({
            minHeight: '3em',
        })

    },
    card: {
        ...shorthands.margin('0', '5px'),
        textAlign: 'left',
        boxShadow: `0px 0.6px 1.8px ${tokens.colorNeutralShadowAmbient}, 0px 3.2px 7.2px ${tokens.colorNeutralShadowKey}`,
        backgroundColor: tokens.colorNeutralBackground1,
        height: '100%',
        minWidth: DISPLAY_CARD_WIDTH,
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground2,
            boxShadow: 'rgb(0 0 0 / 14%) 0px 8px 16px, rgb(0 0 0 / 12%) 0px 0px 2px'
        },
        ':active': {
            backgroundColor: tokens.colorNeutralBackground2,
        },
        ...breakpoints.sm({
            width: '100%'
        })
    },
    cardPreview: {
        marginBottom: 0
    },
    cardContainerFlex: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'auto',
        ...shorthands.gap('4px'),
        ...breakpoints.sm({
            display: 'flex',
            flexDirection: 'row',
        })
    },
    footerFlex: {
        ...shorthands.gap('4px'),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...breakpoints.sm({
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'end',
            marginLeft: 'auto',
            paddingLeft: '2%'
        }),
    },
    shareToTeams: {
        display: 'inline-block',
        ...breakpoints.sm({ display: 'none' })
    },
    cardHeaderImage: {
        display: 'initial',
        ...breakpoints.sm({ display: 'none' })
    },
    footerNewTagStyle: {
        display: 'none',
        ...breakpoints.sm({
            marginLeft: 'auto',
            alignSelf: 'center',
            display: 'inline-block'
        })
    },
    newTagStyle: {
        marginLeft: 'auto',
        alignSelf: 'center',
        display: 'inline-block',
        ...breakpoints.sm({ display: 'none' })
    }
})
