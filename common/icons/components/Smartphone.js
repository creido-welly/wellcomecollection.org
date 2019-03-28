const SvgSmartphone = props => (
  <svg width={24} height={24} {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M-168-318h504v450h-504z" />
      <path d="M0 0h24v24H0z" />
      <g fill="#000" fillRule="nonzero" transform="translate(5 1)">
        <path d="M10 .69H4.38a4 4 0 0 0-4 4v13.09a4 4 0 0 0 4 4H10a4 4 0 0 0 4-4V4.67a4 4 0 0 0-4-3.98zM2.39 6.75H12v6.57H2.39V6.75zm2-4.06H10a2 2 0 0 1 2 2v.08H2.39v-.1a2 2 0 0 1 1.99-1.98h.01zM10 19.77H4.38a2 2 0 0 1-2-2v-2.45H12v2.47a2 2 0 0 1-2 1.98z" />
        <circle cx={7.2} cy={17.41} r={1.25} />
      </g>
    </g>
  </svg>
);

export default SvgSmartphone;
