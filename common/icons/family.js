const IconFamily = () => (
  <svg viewBox="0 0 26 26">
    <defs>
      <path
        className="icon__shape"
        id="d"
        d="M5.49 21.436v-3.905l-.932-1.254-1.37-.685-1.405-.585.716-.296.51-.594 1.02-.98.53-1.329-.53-1.173-1.02-1.37-1.921-.65-.212-1.74L2.184 3.19 5.933.506h4.216c2.572 1.962 3.858 3.014 3.858 3.156 0 .086.114 2.6.342 7.542l1.802 2.493 1.17 3.572-.415 2.955-2.899 1.212H5.49z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(1 8)" stroke="#010101">
        <circle cx="6" cy="4.8" r="3.2" strokeWidth="1.6" />
        <path
          d="M1.14 10.88a1.125 1.125 0 0 0-.152.468l-.11 1.167a.571.571 0 0 0 .568.626h8.82a.571.571 0 0 0 .57-.626l-.111-1.168a1.125 1.125 0 0 0-.153-.467C9.512 9.09 7.975 8.225 5.856 8.225c-2.118 0-3.654.866-4.715 2.655z"
          strokeWidth="1.75"
        />
      </g>
      <g transform="translate(6 1)">
        <mask id="c" fill="#fff">
          <use xlinkHref="#d" />
        </mask>
        <path
          className="icon__shape"
          d="M11.916 11.472a6 6 0 1 0-8 0c-3.57 1-4.62 3.4-4.9 6.23a3 3 0 0 0 3 3.31h11.82a3 3 0 0 0 3-3.31c-.28-2.83-1.34-5.26-4.92-6.23zm-7.99-4.47a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm10.68 11.67a1 1 0 0 1-.77.33H2.016a1 1 0 0 1-1-1.11c.26-2.58 1-4.89 6.91-4.89s6.67 2.31 6.94 4.89a1 1 0 0 1-.26.78z"
          fill="#000"
          fillRule="nonzero"
          mask="url(#c)"
        />
      </g>
    </g>
  </svg>
);

export default IconFamily;