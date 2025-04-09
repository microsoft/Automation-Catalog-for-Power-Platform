import { Button, Input, Label, Title1, Link, Switch, Subtitle1, Field, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import { ChevronLeftFilled } from '@fluentui/react-icons';
import { DisplayCanvas } from "../../common/controls/DisplayCanvas/DisplayCanvas";
import { useCommonStyles } from "../../common.styles";
import { useStyles } from "./Settings.styles";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useUpdateEmailsSubscription } from "../../hooks/useUpdateEmailsSubscription";
import { useUpdateTeamsNotificationsSubscription } from "../../hooks/useUpdateTeamsNotificationsSubscription";
import { useUpdatePersonalDevEnvId } from "../../hooks/useUpdatePersonalDevEnvId";
import { UserContext } from "../../common/contexts/UserContext";
import { useToast } from "../../hooks/useToast";
import { useBetween } from "use-between";
import { ERROR_TOAST_INTENT, SUCCESS_TOAST_INTENT } from "../../common/helpers/Constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { RootCanvas } from "../../common/controls/RootCanvas/RootCanvas";
import config from "../../config";
import { EventTypes } from "../../common/models/LoggingServiceTypes";
import { LoggerContext } from "../../common/contexts/LoggerContext";

export default function Settings() {
    const { setCurrentPage, trackEvent } = useContext(LoggerContext);
    const commonStyles = useCommonStyles();
    const styles = useStyles();
    const { t } = useTranslation(["Settings", "Common"]);
    const { userBasicData } = useContext(UserContext);
    const useSharedToast = () => useBetween(useToast);
    const { updateToastState } = useSharedToast();
    const [personalDevEnvId, setPersonalDevEnvId] = useState<string>(userBasicData?.personalDevEnvId || "");
    const [isPDEValueValid, setIsPDEValueValid] = useState<boolean>(!!userBasicData?.personalDevEnvId || false);
    const [showPDEDialog, setShowPDEDialog] = useState<boolean>(!!!userBasicData?.personalDevEnvId);
    const [showPDESaveConfirmationDialog, setShowPDESaveConfirmationDialog] = useState<boolean>(false);
    const PDEInputRef = useRef<HTMLInputElement>(null);
    const { state } = useLocation();
    const client = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        if (PDEInputRef.current && state?.focusPDEInput) {
            PDEInputRef.current.focus();
        }
    }, [state]);

    useEffect(() => {
        setCurrentPage('settingsPage');
        trackEvent("SETTINGS_PAGE_LOADED", {
            eventType: EventTypes.USER_EVENT,
            eventName: "settingsPageLoaded",
            eventDetails: {
                UserHasPDE: isPDEValueValid
            }
        });
    }, []);

    //#region mutations for calls to API
    const {
        mutate: updateEmailsSubscription,
        isSuccess: emailsPreferenceSuccess,
        isError: emailPreferenceError,
        isLoading: emailPreferenceLoading
    } = useUpdateEmailsSubscription();
    const {
        mutate: updateTeamsPushNotificationsSubscription,
        isSuccess: teamsNotificationsPreferenceSuccess,
        isError: teamsNotificationsPreferenceError,
        isLoading: teamsNotificationsPreferenceLoading
    } = useUpdateTeamsNotificationsSubscription();
    const {
        mutate: updatePersonalDevEnvId,
        isError: PersonalDevEnvIdUpdateError,
        isLoading: PersonalDevEnvIdUpdateLoading,
        isSuccess: PersonalDevEnvIdUpdateSuccess
    } = useUpdatePersonalDevEnvId();

    const onSwitchChange = useCallback(
        (ev: React.FormEvent<HTMLElement>) => {
            const switchValue = (ev.target as HTMLInputElement).checked;
            switch ((ev.target as HTMLInputElement).id) {
                case "emailNotificationsSwitch":
                    updateEmailsSubscription(switchValue);
                    break;
                case "teamsPushNotificationsSwitch":
                    updateTeamsPushNotificationsSubscription(switchValue);
                    break;
                default:
                    break;
            }
        }, [updateEmailsSubscription, updateTeamsPushNotificationsSubscription]);
    //#endregion

    //#region useEffects for notification preference updates
    useEffect(() => {
        if (emailsPreferenceSuccess) {
            updateToastState(t("notificationPreferenceChangeSuccessMessage"), SUCCESS_TOAST_INTENT);
            client.invalidateQueries("user-details");
        }
    }, [emailsPreferenceSuccess, teamsNotificationsPreferenceSuccess]);

    useEffect(() => {
        if (emailPreferenceError) {
            updateToastState(t("notificationPreferenceChangeErrorMessage"), ERROR_TOAST_INTENT);
        }
    }, [emailPreferenceError, teamsNotificationsPreferenceError]);

    useEffect(() => {
        if (teamsNotificationsPreferenceSuccess) {
            updateToastState(t("notificationPreferenceChangeSuccessMessage"), SUCCESS_TOAST_INTENT);
            client.invalidateQueries("user-details");
        }
    }, [teamsNotificationsPreferenceSuccess]);

    useEffect(() => {
        if (teamsNotificationsPreferenceError) {
            updateToastState(t("notificationPreferenceChangeErrorMessage"), ERROR_TOAST_INTENT);
        }
    }, [teamsNotificationsPreferenceError]);
    //#endregion

    useEffect(() => {
        if (userBasicData?.personalDevEnvId) {
            setPersonalDevEnvId(userBasicData.personalDevEnvId);
        }
    }, [userBasicData]);

    useEffect(() => {
        if (!!personalDevEnvId) {
            const regexExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/gi;
            const isGuid = regexExp.test(personalDevEnvId);
            if (isGuid) {
                setIsPDEValueValid(true);
                return;
            }
            else {
                setIsPDEValueValid(false);
            }
        }
        setIsPDEValueValid(false);
    }, [personalDevEnvId]);

    const PDEFieldBlur = useCallback(() => {
        if (personalDevEnvId !== userBasicData?.personalDevEnvId && isPDEValueValid) {
            setShowPDESaveConfirmationDialog(true);
        }
    }, [isPDEValueValid, personalDevEnvId, userBasicData?.personalDevEnvId]);

    const updateEnvId = useCallback(() => {
        if (isPDEValueValid) {
            setShowPDESaveConfirmationDialog(false);
            updatePersonalDevEnvId(personalDevEnvId);
        }
    }, [personalDevEnvId, updatePersonalDevEnvId, isPDEValueValid]);

    const cancelPDESave = useCallback(() => {
        setShowPDESaveConfirmationDialog(false);
        setPersonalDevEnvId(userBasicData?.personalDevEnvId || "");
        PDEInputRef?.current?.focus();
    }, [userBasicData?.personalDevEnvId]);

    useEffect(() => {
        if (PersonalDevEnvIdUpdateSuccess) {
            updateToastState(t("personalDevEnvIdChangeSuccessMessage"), SUCCESS_TOAST_INTENT);
            client.invalidateQueries("user-details");
            trackEvent("PDE_ID_UPDATED", {
                eventType: EventTypes.USER_EVENT,
                eventName: "PersonalDevEnvIdUpdated"
            });
        }
    }, [PersonalDevEnvIdUpdateSuccess]);

    useEffect(() => {
        if (PersonalDevEnvIdUpdateError) {
            updateToastState(t("personalDevEnvIdChangeErrorMessage"), ERROR_TOAST_INTENT);
        }
    }, [PersonalDevEnvIdUpdateError]);

    const renderPDEDialog = useCallback(() => {
        if (showPDEDialog) {
            return (
                <Dialog open={true} modalType="alert">
                    <DialogSurface>
                        <DialogBody>
                            <DialogTitle>{t("pdeDialogTitle")}</DialogTitle>
                            <DialogContent>
                                <p>
                                    <Trans t={t} i18nKey="pdeDialogMessage" components={[<Link href={config.ppacUrl} target="_blank" />]} />
                                </p>
                                <p>
                                    <Trans t={t} i18nKey="pdeCreationInstructionsMessage" components={[<Link href={config.pdeCreationInstructionsUrl} target="_blank" />]} />
                                </p>
                            </DialogContent>
                            <DialogActions>
                                <DialogTrigger disableButtonEnhancement>
                                    <Button appearance="secondary" onClick={() => setShowPDEDialog(false)}>Close</Button>
                                </DialogTrigger>
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </Dialog >
            );
        }
        return null;
    }, [showPDEDialog, userBasicData?.personalDevEnvId]);

    const renderPDESaveConfirmationDialog = useCallback(() => {
        if (showPDESaveConfirmationDialog) {
            return (
                <Dialog open={true} modalType="alert">
                    <DialogSurface>
                        <DialogBody>
                            <DialogTitle>{t("pdeSaveConfirmationDialogTitle")}</DialogTitle>
                            <DialogContent>
                                <p>
                                    {t("pdeSaveConfirmationDialogMessage")}
                                </p>
                            </DialogContent>
                            <DialogActions>
                                <Button appearance="secondary" onClick={() => cancelPDESave()}>{t("Common:cancel")}</Button>
                                <Button appearance="primary" onClick={() => updateEnvId()}>{t("Common:save")}</Button>
                            </DialogActions>
                        </DialogBody>
                    </DialogSurface>
                </Dialog>
            );
        }
        return null;
    }, [updateEnvId, showPDESaveConfirmationDialog, cancelPDESave]);

    return (
        <RootCanvas className={styles.root} >
            <DisplayCanvas className={styles.displayCanvas}>
                <div className={styles.header}>
                    <Button
                        icon={<ChevronLeftFilled className={commonStyles.backButtonIcon} />}
                        appearance='subtle'
                        size='small'
                        className={commonStyles.backButton}
                        onClick={() => { navigate(-1) }}
                        data-testid="item-backButton">
                        {t('Common:back')}
                    </Button>
                </div>
                <Title1 className={commonStyles.pageHeading}>{t("settingsTitle")}</Title1>
                <div className={styles.settingsSection}>
                    <div>
                        <Subtitle1>{t("environmentSectionTitle")}</Subtitle1>
                    </div>
                    <div className={styles.settingsSectionDescription}>
                        {config.adminDefaultEnv
                            ? <p>
                                <Trans t={t} i18nKey="adminDefaultEnvMessage" values={{ adminDefaultEnv: config.adminDefaultEnv }} components={[<strong />]} />
                            </p>
                            : <p>
                                <span>{t('adminDefaultEnvUnavailableMessage')}</span>
                            </p>
                        }
                        <Label>{t("environmentSectionDescription")}</Label>
                        <br />
                        <Link href="" onClick={() => setShowPDEDialog(true)}>{t("personalDevEnvLearMoreUrlTitle")}</Link>
                    </div>
                    <div className={styles.inputField}>
                        <Field label={t("environmentIdInputLabel")}
                            validationState={isPDEValueValid ? "none" : "error"}
                            validationMessage={isPDEValueValid ? "" : t("personalDevEnvIdInvalidErrorMessage")}>
                            <Input appearance="outline" id="environmentId" ref={PDEInputRef}
                                value={personalDevEnvId}
                                onChange={(ev, data) => setPersonalDevEnvId(data.value)}
                                disabled={PersonalDevEnvIdUpdateLoading}
                                test-id="environmentId"
                                onBlur={() => PDEFieldBlur()}
                            />
                        </Field>
                    </div>
                </div>
                <div className={styles.settingsSection}>
                    <div>
                        <Subtitle1>{t("notificationsSectionTitle")}</Subtitle1>
                    </div>
                    <div className={styles.settingsSectionDescription}>
                        <Label>{t("notificationsSectionDescription")}</Label>
                    </div>
                    <div>
                        <Switch
                            label={t("emailNotificationsTitle")}
                            labelPosition="above"
                            onChange={onSwitchChange}
                            id="emailNotificationsSwitch"
                            defaultChecked={userBasicData?.emailsSubscribed}
                            disabled={emailPreferenceLoading}
                            test-id="emailNotificationsSwitch"
                        />
                    </div>
                    <div>
                        <Switch
                            label={t("teamsPushNotificationsTitle")}
                            labelPosition="above"
                            onChange={onSwitchChange}
                            id="teamsPushNotificationsSwitch"
                            defaultChecked={userBasicData?.teamsNotificationsSubscribed}
                            disabled={teamsNotificationsPreferenceLoading}
                            test-id="teamsPushNotificationsSwitch"
                        />
                    </div>
                </div>
            </DisplayCanvas >
            {renderPDEDialog()}
            {renderPDESaveConfirmationDialog()}
        </RootCanvas>
    );
}