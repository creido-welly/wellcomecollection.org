const SvgCalendarAdded = props => (
  <svg width={24} height={24} {...props}>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M-120-66h504v450h-504z" />
      <path d="M0 0h24v24H0z" />
      <path
        fill="#000"
        fillRule="nonzero"
        d="M10.59 19.88a1 1 0 0 0 1.41 0l5-5a1 1 0 0 0-1.41-1.41l-4.33 4.33-1.49-1.49a1 1 0 0 0-1.41 1.41l2.23 2.16z"
      />
      <path
        fill="#000"
        fillRule="nonzero"
        d="M18 4.42v-1.5a1 1 0 0 0-2 0v1.5H8v-1.5a1 1 0 1 0-2 0v1.5a4 4 0 0 0-4 4v11a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-11a4 4 0 0 0-4-4zm-14 4a2 2 0 0 1 2-2v1.5a1 1 0 1 0 2 0v-1.5h8v1.5a1 1 0 0 0 2 0v-1.5a2 2 0 0 1 2 2v1.5H4v-1.5zm16 11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.5h16v7.5z"
      />
    </g>
  </svg>
);

export default SvgCalendarAdded;
