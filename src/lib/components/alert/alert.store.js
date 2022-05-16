import { writable } from "svelte/store";
import { ALERT_FADE_IN } from './alert.config';

export const alerts = writable([]);

export const handleAlert = (alert) => {
    alerts.update(alerts => alerts.concat([alert]));
    clearAlertTimeout();
}

export const clearAlert = () => alerts.update(alerts => alerts.slice(1));
export const clearAlertTimeout = () => setTimeout(clearAlert, ALERT_FADE_IN);
