
// @flow
import {Fragment} from 'react';
import {spacing, grid, font} from '../../../../utils/classnames';
import TexturedBackground from '../../Templates/BasicPage/TexturedBackground';
import type {Node} from 'react';
import type {CaptionedImage} from '../../Images/Images';
import type WobblyBackground from '../../Templates/BasicPage/WobblyBackground';
import type VideoEmbed from '../../VideoEmbed/VideoEmbed';

type Props = {|
  title: string,
  Background: ?(WobblyBackground | CaptionedImage),
  TagBar: ?Node, // potentially make this only take Aync | Tags?
  DateInfo: ?Node,
  InfoBar: ?Node,
  Description: ?Node,
  FeaturedMedia: ?(CaptionedImage | VideoEmbed)
|}

const backgroundTexture = 'https://wellcomecollection.cdn.prismic.io/wellcomecollection%2F9154df28-e179-47c0-8d41-db0b74969153_wc+brand+backgrounds+2_pattern+2+colour+1.svg';
const BasicHeader = ({
  title,
  Background,
  TagBar,
  DateInfo,
  Description,
  InfoBar,
  FeaturedMedia
}: Props) => {
  const BackgroundComponent = Background ||
    (FeaturedMedia ? TexturedBackground({backgroundTexture}) : null);

  return (
    <Fragment>
      {BackgroundComponent}
      <div className='row' style={{
        backgroundImage: BackgroundComponent ? null : `url(${backgroundTexture})`,
        backgroundSize: BackgroundComponent ? null : '150%'
      }}>
        <div className={`container ${spacing({s: 5, m: 7}, {padding: ['top']})} ${spacing({s: 1}, {padding: ['bottom']})}`}>
          <div className='grid'>
            <div className={`${grid({s: 12, m: 10, shiftM: 1, l: 8, shiftL: 2, xl: 8, shiftXL: 2})}`}>
              {TagBar}
            </div>
            <div className={`${grid({s: 12, m: 10, shiftM: 1, l: 8, shiftL: 2, xl: 8, shiftXL: 2})}`}>
              <h1 className={`
              h1 inline-block no-margin
              ${Background ? '' : `
                bg-white
                ${spacing({ s: 2 }, { padding: ['left', 'right'] })}
                ${spacing({ s: 1 }, { padding: ['bottom', 'top'] })}
              `}
            `}>{title}</h1>

              {DateInfo &&
                <div className={`${font({s: 'HNL3'})} ${spacing({s: 3}, {margin: ['top']})}`}>
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

              {FeaturedMedia &&
                <div className={`${spacing({ s: 2 }, { margin: ['top'] })}`} key={'rasjhd'}>
                  <Fragment>{FeaturedMedia}</Fragment>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BasicHeader;