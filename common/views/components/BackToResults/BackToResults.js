// @flow
import { useContext } from 'react';
import NextLink from 'next/link';
import CatalogueSearchContext from '../../components/CatalogueSearchContext/CatalogueSearchContext';
import { font, classNames } from '../../../utils/classnames';
import { trackEvent } from '../../../utils/ga';
import { worksUrl } from '../../../services/catalogue/urls';

const BackToResults = () => {
  const { query, workType, page, _queryType } = useContext(
    CatalogueSearchContext
  );
  const link = worksUrl({
    query,
    page,
    workType,
    _queryType,
  });
  return (
    <NextLink {...link}>
      <a
        onClick={() => {
          trackEvent({
            category: 'BackToResults',
            action: 'follow link',
            label: `${link.href.query.query} | page: ${link.href.query.page ||
              1}`,
          });
        }}
        className={classNames({
          [font({ s: 'HNM5', m: 'HNM4' })]: true,
        })}
      >
        <span>{`Search${query ? ' results' : ''}`}</span>
      </a>
    </NextLink>
  );
};

export default BackToResults;
