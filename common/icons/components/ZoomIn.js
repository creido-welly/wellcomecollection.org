const SvgZoomIn = props => (
  <svg width={24} height={24} {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M-264-402h504V48h-504z" />
      <path d="M0 0h24v24H0z" />
      <g fill="#000" fillRule="nonzero">
        <path d="M21.15 19.71L17 15.61A8 8 0 1 0 15.63 17l4.1 4.1a1 1 0 0 0 1.41-1.41l.01.02zm-10.39-3a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" />
        <path d="M13.93 9.74h-2.08V7.67a1 1 0 1 0-2 0v2.08H7.78a1 1 0 1 0 0 2h2.08v2.08a1 1 0 0 0 2 0v-2.09h2.08a1 1 0 0 0 0-2h-.01z" />
      </g>
    </g>
  </svg>
);

export default SvgZoomIn;
