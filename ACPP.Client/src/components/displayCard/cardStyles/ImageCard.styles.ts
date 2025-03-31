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
        minHeight: '2.7em'
    },
    card: {
        ...shorthands.margin('0', '5px'),
        textAlign: 'left',
        boxShadow: `0px 0.6px 1.8px ${tokens.colorNeutralShadowAmbient}, 0px 3.2px 7.2px ${tokens.colorNeutralShadowKey}`,
        height: '100%',
        minWidth: DISPLAY_CARD_WIDTH,
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground2,
            boxShadow: 'rgb(0 0 0 / 14%) 0px 8px 16px, rgb(0 0 0 / 12%) 0px 0px 2px'
        },
        ':active': {
            backgroundColor: tokens.colorNeutralBackground2,
        },
    },
    cardPreview: {
        maginBottom: '25px',
        ...breakpoints.sm({ marginBottom: 0 })
    },
    cardContainerFlex: {
        ...shorthands.gap('4px'),
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    footerFlex: {
        ...shorthands.gap('4px'),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10%'
    },
    shareToTeams: {},
    cardHeader: {},
    cardHeaderImage: {},
    footerNewTagStyle: {},
    newTagStyle: {},
    displayFlex: {}
});