import {Fragment} from 'react';
import { storiesOf } from '@storybook/react';
import PrimaryLink from '../../../common/views/components/Links/PrimaryLink/PrimaryLink';
import {sized} from '../../../common/utils/style';

const stories = storiesOf('Components', module);
stories.add('Links: Primary', () => (
  <Fragment>
    <h2 className='h2'>Link</h2>
    <PrimaryLink url={`#`} name={`View all exhibitions`} />
    <hr style={{
      marginTop: sized(3),
      marginBottom: sized(3)
    }} />
    <h2 className='h2'>Internal target</h2>
    <PrimaryLink url={`#`} name={`See all dates`} isJumpLink={true} />
  </Fragment>
));
