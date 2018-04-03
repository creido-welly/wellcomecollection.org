// @flow
// TODO - capture opening hours in Prismic, then this can become part of prismic services
import {placesOpeningHours} from '../model/opening-hours';
import moment from 'moment';
import type {ExceptionalVenueHours} from '../model/opening-hours';

function london(d) {
  // $FlowFixMe
  return moment.tz(d, 'Europe/London');
};

function exceptionalOpeningDates(placesHoursArray): Array<?Date> {
  return [].concat.apply([], placesHoursArray.map(place => { // [].concat.apply to flatten the array
    return place.openingHours.exceptional &&
      place.openingHours.exceptional.map(exceptionalDate => exceptionalDate.overrideDate);
  }).filter(_ => _))
    .sort((a, b) => Number(a) - Number(b))
    .filter((item, i, array) => {
      const firstDate = item;
      const prevDate = array[i - 1];
      if (!i) {
        return true;
      } else if (firstDate instanceof Date && prevDate instanceof Date) {
        return firstDate.toString() !== prevDate.toString();
      }
    });
};

export const exceptionalDates = exceptionalOpeningDates(placesOpeningHours);

export function exceptionalOpeningPeriods(dates): Array<Date[]> { // TODO dates type OpeningHours?
  let groupedIndex = 0;

  return dates && dates.reduce((acc, date, i, array) => {
    const currentDate = london(date);
    const previousDate = array[i - 1] ? array[i - 1] : null;

    if (!previousDate) {
      acc[groupedIndex] = [];
      acc[groupedIndex].push(date);
    } else if (previousDate && currentDate.isBefore(london(previousDate).add(4, 'days'))) {
      acc[groupedIndex].push(date);
    } else {
      groupedIndex++;
      acc[groupedIndex] = [];
      acc[groupedIndex].push(date);
    }

    return acc;
  }, []);
}

export function exceptionalOpeningHours(dates, placesOpeningHours): ExceptionalVenueHours[] {
  return [].concat.apply([], dates.reduce((acc, exceptionalDate) => {
    const exceptionalDay = london(exceptionalDate).format('dddd');
    const overrides = placesOpeningHours.map(place => {
      const override = place.openingHours.exceptional &&
      place.openingHours.exceptional.find(item => {
        if (item.overrideDate && exceptionalDate) {
          return item.overrideDate.toString() === exceptionalDate.toString();
        }
      });
      const openingHours = override || place.openingHours.regular.find(item => item.dayOfWeek === exceptionalDay);
      return {
        exceptionalDate,
        exceptionalDay,
        id: place.id,
        name: place.name,
        openingHours
      };
    });
    acc.push(overrides);

    return acc;
  }, []));
}

export function upcomingExceptionalOpeningPeriods(dates: Date[]): Array<Date[]> {
  return dates && dates.filter((dates) => {
    const displayPeriodStart = london().subtract(1, 'day');
    const displayPeriodEnd = london().add(15, 'day');
    return london(dates[0]).isBetween(displayPeriodStart, displayPeriodEnd) || london(dates[dates.length - 1]).isBetween(displayPeriodStart, displayPeriodEnd);
  });
}
