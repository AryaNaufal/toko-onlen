import { Metadata } from "next";

type Props = {
  params: {
    productId: string;
  };
};

// Generate Metadata with params
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const title = await new Promise((resolve) => {
    setTimeout(() => resolve(`iPhone ${params.productId}`), 100);
  });
  return {
    title: `Product ${title}`,
    description: "Generated by create next app",
  };
};