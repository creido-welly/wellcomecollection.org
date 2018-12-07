// @flow
import {Fragment, Component} from 'react';
import {Transition} from 'react-transition-group';
import Image from '../Image/Image';
import Control from '../Buttons/Control/Control';
import {spacing} from '../../../utils/classnames';
import dynamic from 'next/dynamic';
import ReactGA from 'react-ga';

const ImageViewerImage = dynamic(import('./ImageViewerImage'));

type LaunchViewerButtonProps = {|
  classes: string,
  clickHandler: () => void,
  didMountHandler: () => void,
|}

class LaunchViewerButton extends Component<LaunchViewerButtonProps> {
  componentDidMount() {
    this.props.didMountHandler();
  }

  render() {
    return (
      <Control
        type='dark'
        text='View larger image'
        icon='zoomIn'
        extraClasses={`image-viewer__launch-button ${this.props.classes}`}
        clickHandler={this.props.clickHandler} />
    );
  }
};

type ViewerContentProps = {|
  id: string,
  contentUrl: string,
  classes: string,
  viewerVisible: boolean,
  handleViewerDisplay: Function
|}

class ViewerContent extends Component<ViewerContentProps> {
  escapeCloseViewer = ({keyCode}: KeyboardEvent) => {
    if (keyCode === 27 && this.props.viewerVisible) {
      this.props.handleViewerDisplay();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escapeCloseViewer);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escapeCloseViewer);
  }

  handleZoomIn = (event) => {
    ReactGA.event({
      category: 'component',
      action: 'work-zoom-in-button:click',
      label: `id:${this.props.id}`
    });
  }

  handleZoomOut = (event) => {
    ReactGA.event({
      category: 'component',
      action: 'work-zoom-out-button:click',
      label: `id:${this.props.id}`
    });
  }

  render() {
    return (
      <div className={`${this.props.classes} image-viewer__content image-viewer__content2`}>
        <div className='image-viewer__controls flex flex-end flex--v-center'>
          <Control
            type='light'
            text='Zoom in'
            id={`zoom-in-${this.props.id}`}
            icon='zoomIn'
            extraClasses={`${spacing({s: 1}, {margin: ['right']})}`}
            clickHandler={this.handleZoomIn} />

          <Control
            type='light'
            text='Zoom out'
            id={`zoom-out-${this.props.id}`}
            icon='zoomOut'
            extraClasses={`${spacing({s: 8}, {margin: ['right']})}`}
            clickHandler={this.handleZoomOut} />

          <Control
            type='light'
            text='Close image viewer'
            icon='cross'
            extraClasses={`${spacing({s: 2}, {margin: ['right']})}`}
            clickHandler={this.props.handleViewerDisplay} />
        </div>

        {this.props.viewerVisible && <ImageViewerImage id={this.props.id} contentUrl={this.props.contentUrl} />}
      </div>
    );
  }
}

type ImageViewerProps = {|
  id: string,
  trackTitle: string,
  contentUrl: string,
  width: number
|}

type ImageViewerState = {|
  showViewer: boolean,
  mountViewButton: boolean,
  viewButtonMounted: boolean
|}

class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {
  state = {
    showViewer: false,
    mountViewButton: false,
    viewButtonMounted: false
  };

  handleViewerDisplay = () => {
    ReactGA.event({
      category: 'component',
      action: `ImageViewer:${this.state.showViewer ? 'did close' : 'did open'}`,
      label: `id:${this.props.id},title:${this.props.trackTitle}`
    });

    this.setState(prevState => ({
      showViewer: !prevState.showViewer
    }));
  }

  viewButtonMountedHandler = () => {
    this.setState(prevState => ({
      viewButtonMounted: !prevState.viewButtonMounted
    }));
  }

  componentDidMount() {
    this.setState(prevState => ({
      mountViewButton: true
    }));
  }

  render() {
    return (
      <Fragment>
        <Image
          width={this.props.width}
          contentUrl={this.props.contentUrl}
          lazyload={false}
          sizesQueries='(min-width: 860px) 800px, calc(92.59vw + 22px)'
          alt=''
          clickHandler={this.handleViewerDisplay}
          zoomable={this.state.viewButtonMounted}
          defaultSize={800}
          extraClasses='margin-h-auto width-auto full-height full-max-width block' />
        <Transition in={this.state.mountViewButton} timeout={700}>
          {
            (status) => {
              if (status === 'exited') {
                return null;
              }
              return <LaunchViewerButton
                classes={`slideup-viewer-btn slideup-viewer-btn-${status}`}
                didMountHandler={this.viewButtonMountedHandler}
                clickHandler={this.handleViewerDisplay} />;
            }
          }
        </Transition>
        {this.state.showViewer &&
          <ViewerContent
            classes=''
            viewerVisible={this.state.showViewer}
            id={this.props.id}
            contentUrl={this.props.contentUrl}
            handleViewerDisplay={this.handleViewerDisplay} />
        }
      </Fragment>
    );
  }
}

export default ImageViewer;
