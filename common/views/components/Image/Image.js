// @flow
import {convertImageUri} from '../../../utils/convert-image-uri';
import {imageSizes} from '../../../utils/image-sizes';
import {Fragment} from 'react';

export type Props = {|
  contentUrl: string,
  width: number,
  alt: string,
  height?: number,
  clipPathClass?: string,
  caption?: string,
  lazyload?: boolean,
  sizesQueries?: string,
  copyright?: string,
  defaultSize?: number,
  clickHandler?: () => void,
  zoomable?: boolean,
  extraClasses?: string
|}

const Image = ({
  width,
  height,
  contentUrl,
  clipPathClass,
  caption,
  copyright,
  lazyload = true,
  sizesQueries = '100vw',
  defaultSize = 30,
  alt = '',
  clickHandler,
  zoomable,
  extraClasses
}: Props) => (
  <Fragment>
    <noscript dangerouslySetInnerHTML={{__html: `
      <img width=${width}
        height=${height || ''}
        className='image image--noscript'
        src=${convertImageUri(contentUrl, 640, false)}
        alt=${alt} />`}} />
    {imageMarkup(
      width,
      height,
      clipPathClass,
      lazyload,
      defaultSize,
      contentUrl,
      sizesQueries,
      copyright,
      alt,
      caption,
      clickHandler,
      zoomable,
      extraClasses
    )}
  </Fragment>
);

const imageClasses = (clip = false, lazyload: boolean, clipPathClass, zoomable) => {
  const lazyloadClass = lazyload ? 'lazy-image lazyload' : '';
  const clipClass = clip ? `promo__image-mask ${clipPathClass || ''}` : '';
  const zoomClass = zoomable ? 'cursor-zoom-in' : '';

  return `image ${lazyloadClass} ${clipClass} ${zoomClass}`;
};

const imageMarkup = (width, height, clipPathClass, lazyload = false, defaultSize, contentUrl, sizesQueries, copyright, alt, caption, clickHandler, zoomable, extraClasses) => {
  const sizes = imageSizes(width);
  const baseMarkup = clip => (
    <img width={width}
      height={height}
      className={`${imageClasses(clip, lazyload, clipPathClass, zoomable)} ${extraClasses || ''}`}
      src={convertImageUri(contentUrl, defaultSize, false)}
      data-srcset={sizes.map(size => {
        return `${convertImageUri(contentUrl, size, false)} ${size}w`;
      })}
      sizes={sizesQueries}
      data-copyright={copyright}
      onClick={clickHandler}
      alt={alt} />
  );

  return clipPathClass ? [
    baseMarkup(),
    baseMarkup(true)]
    : baseMarkup();
};

export default Image;
