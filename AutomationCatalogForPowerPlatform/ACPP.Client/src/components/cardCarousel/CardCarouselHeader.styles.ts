import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
    navigationHeader: {
        display: 'flex',
        alignItems: 'center'
    },
    seeAllBtn: {
        marginLeft: 'auto'
    },
    title: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '22px',
    },
    hideOnClose: {
        display: "none"
    },
    showOnOpen:{
        display: "block"
    }
});