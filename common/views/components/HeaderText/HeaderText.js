// @flow

import {Fragment} from 'react';
import {font, spacing} from '../../../utils/classnames';
import type {Link} from '../../../model/link';
import type {Node} from 'react';

type Props = {|
  Heading: ?Node,
  TagBar: ?Node,
  DateInfo: ?Node,
  InfoBar: ?Node,
  Description: ?Node,
  topLink: ?Link
|}

const HeaderText = ({
  topLink,
  TagBar,
  Heading,
  DateInfo,
  Description,
  InfoBar
}: Props) => {
  return (
    <div className={spacing({s: 2}, {padding: ['top']})}>
      {topLink &&
        <div className='plain-text'>
          <a className={`${font({s: 'HNL4'})} block`} href={topLink.url}>{topLink.text}</a>
        </div>
      }

      {TagBar &&
        <Fragment>
          {TagBar}
        </Fragment>
      }

      {Heading}

      {DateInfo &&
        <div className={`${font({s: 'HNL3'})}`}>
          {DateInfo}
        </div>
      }

      {Description &&
        <div className={`${font({s: 'HNL4'})} ${spacing({s: 3}, {margin: ['top']})} first-para-no-margin`}>
          {Description}
        </div>
      }

      {InfoBar &&
        <div className={`${font({s: 'HNL4'})} ${spacing({s: 3}, {margin: ['top', 'bottom']})}`}>
          {InfoBar}
        </div>
      }
    </div>
  );
};

export default HeaderText;