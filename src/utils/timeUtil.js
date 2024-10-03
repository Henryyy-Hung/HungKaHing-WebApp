import { formatInTimeZone } from 'date-fns-tz';

const timeUtil = {
    convertToISO8601: (unixTimestamp, timeZone = '+00:00') => {
        const date = new Date(unixTimestamp * 1000);
        return formatInTimeZone(date, timeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
    },

    convertToDisplayDate: (isoDateString, timeZone = '+08:00') => {
        const date = new Date(isoDateString);
        return formatInTimeZone(date, timeZone, "yyyy-MM-dd HH:mm:ss");
    },

    convertToDateOnly: (isoDateString, timeZone = '+08:00') => {
        const date = new Date(isoDateString);
        return formatInTimeZone(date, timeZone, "yyyy-MM-dd");
    },

    convertToShortenDateOnly: (isoDateString, timeZone = '+08:00') => {
        const date = new Date(isoDateString);
        return formatInTimeZone(date, timeZone, "yy-MM-dd");
    },

    convertToTimeOnly: (isoDateString, timeZone = '+08:00') => {
        const date = new Date(isoDateString);
        return formatInTimeZone(date, timeZone, "HH:mm:ss");
    }
}

export default timeUtil;