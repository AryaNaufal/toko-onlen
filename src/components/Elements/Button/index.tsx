export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  ...props
}: any) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-2 py-4 font-bold cursor-pointer text-white ${variant}`}
      {...props}
    >
      {children}
    </button>
  );
};
