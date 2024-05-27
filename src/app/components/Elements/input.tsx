export const Input = ({ logo, placeholder, ...props }: any) => {
  return (
    <div className={'flex items-center border border-slate-300 rounded p-0 overflow-hidden bg-white'}>
      <div className={'mx-3 text-3xl'}>
        {logo}
      </div>
      <input id="input" type="text" placeholder={placeholder} className={'border-none outline-none flex-1 p-3'} {...props} />
    </div>
  );
};