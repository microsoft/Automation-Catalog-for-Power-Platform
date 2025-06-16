// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands } from "@fluentui/react-components";
import { CARD_CAROUSEL_GAP } from "../../common/helpers/Constants";

export const useStyles = makeStyles({
    flexDisplay: {
        display: 'flex'
    },
    title: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '22px',
        alignSelf: 'center'
    },
    carouselHeader: {
        marginLeft: "auto",
        alignSelf: "center"
    },
    cardsContainer: {
        overflowX: 'scroll',
        paddingLeft: '5px !important',
        paddingRight: '5px !important',
        //animate the scroll
        scrollBehavior: 'smooth',
    },
    innerRoot: {
        display: 'flex',
        ...shorthands.gap(CARD_CAROUSEL_GAP + 'px'),
        marginBottom: '1%',
        marginTop: '1%',
        transitionProperty: 'transform',
        transitionDelay: '0s',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.45, 0.05, 0.08, 1)',
        transitionBehaviour: 'normal',
        alignItems: 'stretch',
    }
});
