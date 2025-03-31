import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import breakpoints from "./common/helpers/Breakpoints";

export const useCommonStyles = makeStyles({
    padding5: {
        ...shorthands.padding('5px')
    },
    pageHeading: {
        ...shorthands.margin('1%'),
    },
    pointerCursor: {
        cursor: 'pointer !important'
    },
    backButton: {
        fontSize: '13px',
        ':hover': {
            color: tokens.colorNeutralForeground2BrandHover,
            backgroundColor: 'transparent'
        },
    },
    backButtonIcon: {
        ':hover': {
            color: tokens.colorNeutralForeground2BrandHover,
            backgroundColor: 'transparent'
        }
    },
    announcementBanner: {
        display: 'flex',
        alignItems: 'center',
        ...shorthands.padding('0.7%'),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.margin('1%'),
    },
    announcementBody: {
        width: '100%',
        ...breakpoints.sm({
            ...shorthands.margin('auto', 'auto', '2%', 'auto')
        })
    },
});