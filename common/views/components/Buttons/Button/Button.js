// @flow

import type { GaEvent } from '../../../../utils/ga';
import { trackEvent } from '../../../../utils/ga';
import { font } from '../../../../utils/classnames';
import Icon from '../../Icon/Icon';

type Props = {|
  url?: string,
  type: 'primary' | 'secondary' | 'tertiary',
  extraClasses?: string,
  icon?: string,
  text: string,
  trackingEvent?: GaEvent,
  id?: string,
  disabled?: boolean,
  target?: string,
  download?: string,
  rel?: string,
  clickHandler?: (event: Event) => void,
|};

const Button = ({
  url,
  type,
  id,
  extraClasses,
  icon,
  text,
  trackingEvent,
  disabled,
  target,
  download,
  rel,
  clickHandler,
}: Props) => {
  const HtmlTag = url ? 'a' : 'button';
  const fontClasses =
    extraClasses && extraClasses.indexOf('btn--tertiary') > -1
      ? { s: 'HNM5' }
      : { s: 'HNM4' };
  function handleClick(e) {
    if (clickHandler) {
      clickHandler(e);
    }
    if (trackingEvent) {
      trackEvent(trackingEvent);
    }
  }
  return (
    <HtmlTag
      href={url}
      target={target}
      download={download}
      rel={rel}
      id={id}
      className={`btn btn--${type} ${extraClasses || ''} ${font(
        fontClasses
      )} flex-inline flex--v-center`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className="flex-inline flex--v-center">
        {icon && <Icon name={icon} />}
        <span className="btn__text">{text}</span>
      </span>
    </HtmlTag>
  );
};

export default Button;
