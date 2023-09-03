interface Props {
  onClick?: () => void;
  children: string;
}

const Button = ({ onClick, children }: Props) => (
  <button
    onClick={onClick}
    className='p-1 text-lg font-bold rounded-md bg-white text-black'
  >
    {children}
  </button>
);

export default Button;
