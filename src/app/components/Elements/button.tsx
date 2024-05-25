import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const Button = ({ text, color }: Params, attributes: any) => {
  return (
    <button  className={`${color} text-white font-bold py-2 px-4 rounded`} {...attributes}>
      {text}
    </button>
  );
};
