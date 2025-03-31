import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import breakpoints from '../../common/helpers/Breakpoints';

let navbarLeftMenuHeight, navbarRightMenuHeight, navbarTitleHeight;
navbarLeftMenuHeight = navbarRightMenuHeight = navbarTitleHeight = '50px';

export const useStyles = makeStyles({
    root: {
        position: 'fixed',
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        ...shorthands.padding(0, '16px'),
        backgroundColor: tokens.colorNeutralBackground1,
        ...breakpoints.sm({
            flexWrap: 'wrap',
        })
    },
    logo: {
        height: '32px',
        width: '32px',
        ...breakpoints.sm({
            display: 'none',
        })
    },
    logoImg: {
        height: '100%',
        width: '100%',
        ...shorthands.borderRadius('5px'),
    },
    navbarTitle: {
        height: navbarTitleHeight,
        ...shorthands.margin(0, 0, 0, '10px'),
        display: 'flex',
        alignItems: 'center',
        ...breakpoints.sm({
            display: 'none',
        })
    },
    navbarLeftMenu: {
        height: navbarLeftMenuHeight,
        display: 'flex',
        alignItems: 'center',
        ...shorthands.gap('10px'),
        ...shorthands.margin(0, 0, 0, '20px'),
        alignSelf: 'self-end',
        ...breakpoints.sm({
            ...shorthands.margin('1%', 0, '0.5%', 0),
            width: '80%',
            justifyContent: 'space-around'
        })
    },
    navbarMenuItem: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        fontSize: tokens.fontSizeBase300,
        lineHeight: tokens.lineHeightBase100,
        ...shorthands.borderBottom('2px', 'solid', 'transparent'),
        '&:hover': {
            ...shorthands.borderBottom('2px', 'solid', tokens.colorNeutralForeground2BrandHover),
            cursor: 'pointer'
        },
        width: '-webkit-fill-available',
        justifyContent: 'center',
    },
    navbarMenuItemActive: {
        ...shorthands.borderBottom('auto', 'solid', tokens.colorNeutralForeground2BrandHover),
    },
    navbarLeftMenuItemLink: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        color: tokens.colorNeutralForeground1,
        ...shorthands.textDecoration('none'),
        ...shorthands.padding('5px'),
        fontWeight: tokens.fontWeightSemibold,
    },
    navbarRightMenuItemLink: {
        color: tokens.colorNeutralForeground1,
        ...shorthands.padding('2px'),

    },
    navbarRightMenu: {
        height: navbarRightMenuHeight,
        display: 'flex',
        alignItems: 'center',
        ...shorthands.gap('10px'),
        ...shorthands.margin(0, 0, 0, 'auto'),
        ...breakpoints.sm({
            width: '20%',
        })
    },
    navbarRightSubMenu: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        ...shorthands.gap('10px'),
    }
});
