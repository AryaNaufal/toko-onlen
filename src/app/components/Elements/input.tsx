export const Input = ({ logo, placeholder, ...props }: any) => {
  return (
    <div className={'flex items-center p-0 overflow-hidden bg-white border rounded border-slate-300'}>
      <div className={'mx-3 text-3xl'}>
        {logo}
      </div>
      <input id="input" type="text" placeholder={placeholder} className={'flex-1 p-3 border-none outline-none'} {...props} />
    </div>
  );
};