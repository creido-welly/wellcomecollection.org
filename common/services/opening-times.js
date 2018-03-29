// @flow
// TODO - capture opening hours in Prismic, then this can become part of prismic services
import {placesOpeningHours} from '../model/opening-hours';
import {isDatePast} from '../utils/format-date';
import groupBy from 'lodash.groupby';
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

const exceptionalDates = exceptionalOpeningDates(placesOpeningHours);

export const upcomingExceptionalDates = exceptionalDates.filter(exceptionalDate => exceptionalDate && !isDatePast(exceptionalDate));

function upcomingExceptionalOpeningHours(upcomingDates): ExceptionalVenueHours[] {
  return [].concat.apply([], upcomingDates.reduce((acc, exceptionalDate) => {
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

const upcomingExceptionalHours = upcomingExceptionalOpeningHours(upcomingExceptionalDates);

export const exceptionalOpeningHours = groupBy(upcomingExceptionalHours, item => london(item.exceptionalDate).format('YYYY-MM-DD'));