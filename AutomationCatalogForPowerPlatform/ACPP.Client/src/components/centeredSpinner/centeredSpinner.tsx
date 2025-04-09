import { Spinner } from "@fluentui/react-components";

export const CenteredSpinner = ({ classNames = "" }) => {
    return (
        <div className={classNames} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <Spinner></Spinner>
        </div>
    );
};