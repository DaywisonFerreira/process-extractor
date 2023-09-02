import { DateTime } from 'luxon';
export class DateUtilHelper {
  static getNext30DaysRange() {
    const today = DateTime.local();

    const startDate = today.plus({ days: 1 });
    const endDate = startDate.plus({ days: 30 });

    return {
      startDate: startDate.toFormat('yyyy-MM-dd'),
      endDate: endDate.toFormat('yyyy-MM-dd'),
    };
  }
}
