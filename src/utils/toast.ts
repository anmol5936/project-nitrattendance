import { Dialogs } from '@nativescript/core';

export const showToast = (message: string) => {
  Dialogs.alert({
    title: "Notification",
    message,
    okButtonText: "OK"
  });
};