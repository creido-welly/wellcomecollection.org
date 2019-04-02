const SvgImage = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <g className="icon__shape" fillRule="nonzero" transform="translate(1 4)">
      <path d="M18.5.8h-15a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-10a3 3 0 0 0-3-3zm-15 2h15a1 1 0 0 1 1 1V12L18 10.5a3.09 3.09 0 0 0-4.22 0l-.53.5L9.1 6.79a3.07 3.07 0 0 0-4.24 0L2.5 9.16V3.8a1 1 0 0 1 1-1zm15 12h-15a1 1 0 0 1-1-1v-1.93a1 1 0 0 0 .33-.22l3.46-3.46a1 1 0 0 1 1.41 0l4.49 4.55a1.51 1.51 0 0 0 2.1 0l.91-.86a1 1 0 0 1 1.41 0l2.59 2.59a1 1 0 0 1-.7.33z" />
      <circle cx={14.75} cy={6.25} r={1.75} />
    </g>
  </svg>
);

export default SvgImage;