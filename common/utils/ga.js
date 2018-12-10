import ReactGA from 'react-ga';

export function trackIfOutboundLink(url: string) {
  const isExternal = new window.URL(url).host !== window.location.host;

  if (isExternal) {
    ReactGA.event({
      category: 'outbound',
      action: 'click',
      label: url,
      transport: 'beacon'
    });
  }
}

export type GaEvent = {|
  catagory: string,
  action: string,
  label: string
|}

export function trackEvent(gaEvent: GaEvent) {
  ReactGA.event(gaEvent);
}

export function trackEventV2(event) {
  ReactGA.ga('v2.send', {hitType: 'event', ...event});
}

export function trackComponentAction(
  name: string,
  action: string,
  labels: {[key]: string}
) {
  trackEvent({
    category: 'component',
    action: `${name}:${action}`,
    label: Object.keys(labels).map(key => {
      const val = labels[key];
      return `${key}:${val}`;
    }).join(', ')
  });
}
