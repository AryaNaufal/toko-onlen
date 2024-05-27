export const Button = ({ children, onClick, type = 'button', className = '', ...props }: any) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} text-white font-bold py-2 px-4 rounded`}
      {...props}
    >
      {children}
    </button>
  );
};