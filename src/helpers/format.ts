import { DateTime } from 'luxon';

export const formatDate = (date: Date, lang: string) =>
    DateTime.fromJSDate(date).setLocale(lang).toLocaleString(DateTime.DATETIME_MED);
