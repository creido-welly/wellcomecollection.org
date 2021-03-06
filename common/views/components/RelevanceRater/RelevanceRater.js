// @flow
import styled from 'styled-components';
import { classNames, font, spacing } from '../../../utils/classnames';
import {
  trackRelevanceRating,
  RelevanceRatingEventNames,
} from '../Tracker/Tracker';

const RelevanceRaterStyle = styled.div.attrs(props => ({
  className: classNames({
    flex: true,
    [font({ s: 'HNL5' })]: true,
  }),
}))`
  height: 100%;
`;

const RelevanceRating = styled.button.attrs(props => ({
  className: classNames({
    'plain-button': true,
    [spacing({ s: 1 }, { padding: ['top', 'bottom'] })]: true,
    [spacing({ s: 2 }, { padding: ['left', 'right'] })]: true,
  }),
}))`
  width: 25%;
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.smoke};
  border-left-width: ${props => (props.index === 0 ? 1 : 0)};
  border-bottom-width: 0;
`;

type Props = {|
  position: number,
  id: string,
  query: string,
  page: number,
  workType: ?(string[]),
  _queryType: ?string,
|};

function createEvent(rating) {
  return {
    event: RelevanceRatingEventNames.RateResultRelevance,
    data: rating,
  };
}

const RelevanceRater = ({
  id,
  position,
  query,
  page,
  workType,
  _queryType,
}: Props) => {
  return (
    <div>
      <RelevanceRaterStyle>
        <RelevanceRating
          index={0}
          onClick={() =>
            trackRelevanceRating(
              createEvent({
                id,
                position,
                rating: 1,
                query,
                page,
                workType,
                _queryType,
              })
            )
          }
        >
          No apparent relationship to search term
        </RelevanceRating>
        <RelevanceRating
          index={1}
          onClick={() =>
            trackRelevanceRating(
              createEvent({
                id,
                position,
                rating: 2,
                query,
                page,
                workType,
                _queryType,
              })
            )
          }
        >
          Reasonable to be retrieved but should not be this highly ranked
        </RelevanceRating>
        <RelevanceRating
          index={2}
          onClick={() =>
            trackRelevanceRating(
              createEvent({
                id,
                position,
                rating: 3,
                query,
                page,
                workType,
                _queryType,
              })
            )
          }
        >
          Not perfect but reasonable to be highly ranked
        </RelevanceRating>
        <RelevanceRating
          index={3}
          onClick={() =>
            trackRelevanceRating(
              createEvent({
                id,
                position,
                rating: 4,
                query,
                page,
                workType,
                _queryType,
              })
            )
          }
        >
          Completely relevant to be at this rank
        </RelevanceRating>
      </RelevanceRaterStyle>
    </div>
  );
};

export default RelevanceRater;
