// @flow
import ReactGA from 'react-ga';
import ImageViewer2 from '../ImageViewer/ImageViewer2';
import Control from '../Buttons/Control/Control';
import {iiifImageTemplate} from '../../../utils/convert-image-uri';

type Props = {|
  id: string,
  title: string,
  iiifUrl: string,
  width?: number
|}

const WorkMedia = ({
  id,
  title,
  iiifUrl,
  width = 800
}: Props) => {
  const trackTitle = title.substring(0, 50);
  const imageContentUrl = iiifImageTemplate(iiifUrl)({ size: `${width},` });
  return (
    <div>
      <div id={`work-media-${id}`} className='row bg-black work-media js-work-media'>
        <Control
          type='dark'
          extraClasses='scroll-to-info js-scroll-to-info js-work-media-control flush-container-right'
          url='#work-info'
          trackingEvent={{
            category: 'component',
            action: 'scroll-to-info:click',
            label: 'scrolled-to-id:work-info'
          }}
          clickHandler={() => {
            ReactGA.event({
              category: 'component',
              action: 'scroll-to-info:click',
              label: 'scrolled-to-id:work-info'
            });
          }}
          icon='chevron'
          text='Scroll to info' />

        <ImageViewer2
          contentUrl={imageContentUrl}
          id={id}
          width={width}
          trackTitle={trackTitle}
        />

      </div>
    </div>
  );
};

export default WorkMedia;
