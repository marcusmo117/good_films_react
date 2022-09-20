import { DateTime } from "luxon";

const datetimeToRelativeTime = (datetime) =>
  DateTime.fromISO(new Date(datetime).toISOString()).toRelative();

export default datetimeToRelativeTime;
