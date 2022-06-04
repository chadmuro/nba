import { DateTime } from 'luxon';

export function createDateTime(date?:string, time?: string) {
  if (!date || !time) {
    return DateTime.now().setZone('US/Eastern')
  }
  const dateArray = date.split("-");
  const timeArray = time.split(":")

  return DateTime.fromObject(
		{ year: parseInt(dateArray[0], 10), month: parseInt(dateArray[1], 10), day: parseInt(dateArray[2], 10), hour: parseInt(timeArray[0], 10), minute: parseInt(timeArray[1], 10) },
		{ zone: 'US/Eastern' }
	);
}