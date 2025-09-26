import { UserConfigurationObject } from '~/lib/interfaces/user.interfaces';

const NOTIFY_ME_WHEN = {
  NOTIFY_ALERT: 1, // "There is an alert"
  NOTIFY_NEW_EVENT_CREATED: 2, // "New event created (e.g when new asset is created or new maintenance plan is created)"
  NOTIFY_EVENT_MODIFIED: 3, // "An event is modified or edited"
};

const MOBILE_NOTIFICATION = {
  MOBILE_PUSH_NOTIFICATION_ON: 4, // Enable push notifications on mobile devices
  MOBILE_PUSH_NOTIFICATION_OFF: 5, // Disable push notifications on mobile devices
};

const DESKTOP_NOTIFICATION = {
  DESKTOP_NOTIFICATION_ON: 6, // Enable desktop notifications
  DESKTOP_NOTIFICATION_OFF: 7, // Disable desktop notifications
};

const EMAIL_NOTIFICATION = {
  EMAIL_NOTIFICATION_ON: 8, // Enable email notifications
  EMAIL_NOTIFICATION_OFF: 9, // Disable email notifications
};

const WHATSAPP_NOTIFICATION = {
  WHATSAPP_NOTIFICATION_ON: 104, // Enable whatsapp notifications
  WHATSAPP_NOTIFICATION_OFF: 105, // Disable whatsapp notifications
};

const NOTES_NOTIFICATION = {
  NOTES_NO_NOTIFICATIONS: 10, // "Do not notify me"
  NOTES_MENTIONS_ONLY: 11, // "Mentions Only (only notify me if I'm mentioned in a note)"
  NOTES_ALL_NOTES: 12, // "All Notes (Notify me for all notes)"
};

const REMINDERS_NOTIFICATION = {
  REMINDERS_NO_NOTIFICATIONS: 13, // "Do not notify me (Reminders)"
  REMINDERS_IMPORTANT_ONLY: 14, // "Important Reminders only (Only notify me if the reminder is tagged as important)"
  REMINDERS_ALL: 15, // "All Reminders (Notify me for all reminders)"
};

const APPROVAL_NOTIFICATION = {
  APPROVAL_NO_NOTIFICATIONS: 16, // "Do not notify me (Approvals)"
  APPROVAL_MENTIONS_ONLY: 17, // "Mentions only (Only notify me if the approval is directed to me)"
  APPROVAL_ALL: 18, // "All Approvals (Notify me for all approvals)"
};

const AUTOMATIC_TIMEZONE = {
  AUTOMATIC_TIMEZONE_ON: 19, // "On"
  AUTOMATIC_TIMEZONE_OFF: 20, // "Off"
};

const LANGUAGE = {
  LANGUAGE_ENGLISH: 21, // "English"
};

const DATE_FORMAT = {
  DATE_FORMAT_DDMMYYYY: 22, // "DD/MM/YYYY"
  DATE_FORMAT_MMDDYYYY: 24, // "MM/DD/YYYY"
  DATE_FORMAT_YYYYMMDD: 23, // "YYYY/MM/DD"
};

const APPEARANCE = {
  APPEARANCE_DARK: 25, // "Dark"
  APPEARANCE_LIGHT: 26, // "Light"
};

// Combine all notification options into one object
const NOTIFICATION_CONFIGURATION_OPTIONS = {
  ...NOTIFY_ME_WHEN,
  ...MOBILE_NOTIFICATION,
  ...DESKTOP_NOTIFICATION,
  ...EMAIL_NOTIFICATION,
  ...NOTES_NOTIFICATION,
  ...REMINDERS_NOTIFICATION,
  ...APPROVAL_NOTIFICATION,
};

// Combine all general options into one object
const GENERAL_CONFIGURATION_OPTIONS = {
  ...AUTOMATIC_TIMEZONE,
  ...LANGUAGE,
  ...DATE_FORMAT,
  ...APPEARANCE,
};

// Combine both notification and general configuration options
const SYSTEM_CONFIGURATION_OPTIONS = {
  ...NOTIFICATION_CONFIGURATION_OPTIONS,
  ...GENERAL_CONFIGURATION_OPTIONS,
};

const filterOptionsById = (
  optionId: number,
  options: { [key: string]: number }
): number[] => {
  return Object.values(options).filter((value) => value !== optionId);
};

const getSystemConfigurationOptionIds = (
  options: UserConfigurationObject[]
): number[] => {
  return options.map((item) => item.systemConfigurationOptionId);
};

export {
  NOTIFY_ME_WHEN,
  MOBILE_NOTIFICATION,
  DESKTOP_NOTIFICATION,
  EMAIL_NOTIFICATION,
  WHATSAPP_NOTIFICATION,
  NOTES_NOTIFICATION,
  REMINDERS_NOTIFICATION,
  APPROVAL_NOTIFICATION,
  AUTOMATIC_TIMEZONE,
  LANGUAGE,
  DATE_FORMAT,
  APPEARANCE,
  NOTIFICATION_CONFIGURATION_OPTIONS,
  GENERAL_CONFIGURATION_OPTIONS,
  SYSTEM_CONFIGURATION_OPTIONS,
  filterOptionsById,
  getSystemConfigurationOptionIds,
};
