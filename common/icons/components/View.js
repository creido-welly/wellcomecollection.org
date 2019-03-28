const SvgView = props => (
  <svg width={24} height={24} {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M-24-402h504V48H-24z" />
      <path d="M0 0h24v24H0z" />
      <g fill="#000" fillRule="nonzero" transform="translate(2 4)">
        <path d="M10 0C4.17 0 0 6 0 8s4 8 10 8 10-6 10-8-4.2-8-10-8zm0 14c-4.76 0-8-5-8-6s3.21-6 8-6 8 5.11 8 6c0 .89-3.24 6-8 6z" />
        <circle cx={9.97} cy={8} r={3} />
      </g>
    </g>
  </svg>
);

export default SvgView;
