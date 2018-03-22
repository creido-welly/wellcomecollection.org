// @flow
import {spacing, font} from '../../../utils/classnames';
import {placesOpeningHours as places} from '../../../model/opening-hours';
import {Fragment} from 'react';
import {formatDate} from '../../../utils/format-date';
import moment from 'moment';

type Props = {|
  id: string,
  extraClasses?: string
  |}

function london(d) {
  // $FlowFixMe
  return moment.tz(d, 'Europe/London');
};

const flattenedExceptionalOpeningDates = places.map((place) => {
  if (place.openingHours.exceptional) {
    return place.openingHours.exceptional.map((openingTimes) => {
      return openingTimes.overrideDate;
    });
  }
})
  .filter(_ => _)
  .reduce((prev, curr) => prev && prev.concat(curr));

const uniqueExceptionalOpeningDates = flattenedExceptionalOpeningDates && flattenedExceptionalOpeningDates.sort((a, b) => {
  if (a && b) {
    return a.localeCompare(b);
  } else {
    return 0;
  }
})
  .filter((item, i, array) => !i || item !== array[i - 1]);

let groupedIndex = 0;

const exceptionalOpeningPeriods = uniqueExceptionalOpeningDates && uniqueExceptionalOpeningDates.reduce((acc, date, i, array) => {
  const earliestDate = acc[groupedIndex] ? london(acc[groupedIndex][0]) : london(date);
  const upperLimit = earliestDate.add(10, 'day');
  const currentDate = london(date);

  if (i === 0 || currentDate.isBefore(upperLimit, 'day')) {
    if (i === 0) {
      acc[groupedIndex] = [];
    }
    acc[groupedIndex].push(date);
  } else {
    groupedIndex++;
    acc[groupedIndex] = [];
    acc[groupedIndex].push(date);
  }

  return acc;
}, []);

const upcomingExceptionalOpeningPeriods = exceptionalOpeningPeriods && exceptionalOpeningPeriods.filter((dates) => {
  return london(dates[0]).isBefore(london().add(14, 'day'));
});

const OpeningHours = ({id, extraClasses}: Props) => (
  <Fragment>
    {upcomingExceptionalOpeningPeriods && upcomingExceptionalOpeningPeriods.length > 0 &&
      <p className={font({s: 'HNM4'})}>
        Please note unusual opening times will be in operation on
        {upcomingExceptionalOpeningPeriods.map((group, i, array) => {
          if (group.length > 1) {
            return (
              <span style={{'whiteSpace': 'nowrap'}} key={group[0]}>
                {(array.length > 1 && i > 0) && ', '}
                {` ${formatDate(group[0])}`}&mdash;{`${formatDate(group[group.length - 1])}`}
              </span>
            );
          } else {
            return (
              <span style={{'white-space': 'nowrap'}} key={group[0]}>
                {` ${formatDate(group[0])}`}
              </span>
            );
          }
        })}
        {`. Please check our full opening times for details.`}
      </p>
    }
    <div className={`opening-hours ${extraClasses || ''} js-opening-hours js-tabs`}>
      <ul className={`plain-list opening-hours__tablist ${font({s: 'HNM6'})} ${spacing({s: 0}, {margin: ['top', 'left', 'bottom', 'right'], padding: ['top', 'left', 'bottom', 'right']})} js-tablist`}>
        {places.map((place) => (
          <li key={place.id} className='opening-hours__tabitem js-tabitem'>
            <a className='opening-hours__tablink js-tablink' href={`#${id}-panel-${place.id}`}>{place.name}</a>
          </li>
        ))}
      </ul>
      {places.map((place) => (
        <table key={`${id}-panel-${place.id}`} id={`${id}-panel-${place.id}`} className={`opening-hours__table ${font({s: 'HNL5'})} js-tabpanel`}>
          <caption className='opening-hours__caption js-tabfocus'>{place.name}</caption>
          <thead className='opening-hours__thead'>
            <tr className='opening-hours__tr'>
              <th scope='col'>Day</th>
              <th scope='col'>Times</th>
            </tr>
          </thead>
          <tbody className='opening-hours__tbody'>
            {place.openingHours.regular.map((day) => (
              <tr key={day.dayOfWeek} className='opening-hours__tr'>
                <td className='opening-hours__td'>{day.dayOfWeek}</td>
                {day.opens ? <td className='opening-hours__td'>{`${day.opens} - ${day.closes}`}</td> : <td className='opening-hours__td'>{day.note}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  </Fragment>
);

export default OpeningHours;
