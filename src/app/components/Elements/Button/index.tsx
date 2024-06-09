import style from './Button.module.scss';
export const Button = ({ children, onClick, type = 'button', className = '', variant = 'primary', ...props }: any) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.button} ${style[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};