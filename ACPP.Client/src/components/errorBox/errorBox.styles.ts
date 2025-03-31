import { makeStyles, shorthands } from '@fluentui/react-components';

export const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        maxWidth: '400px',
        maxHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffcdd2',
        ...shorthands.borderRadius('3px'),
        color: '#535151',
        ...shorthands.margin(0, 'auto', 0, 'auto'),
        ...shorthands.border('1pt', 'solid', '#e57373'),
    }
});
