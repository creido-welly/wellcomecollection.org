const SvgPrint = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero">
      <path d="M19 8.19h-1v-6H6v6H5c-1.69 0-3 1.88-3 3.5v4.5a3 3 0 0 0 3 3h1v3h12v-3h1a3 3 0 0 0 3-3v-4.5c0-1.69-1.28-3.5-3-3.5zm-11-4h8v4H8v-4zm8 16H8v-1h8v1zm4-4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4.5c0-.71.6-1.5 1-1.5h14c.44 0 1 .84 1 1.5v4.5z" />
      <path d="M8 11.19H7a1 1 0 1 0 0 2h1a1 1 0 0 0 0-2zm4 0h-1a1 1 0 1 0 0 2h1a1 1 0 0 0 0-2z" />
    </g>
  </svg>
);

export default SvgPrint;