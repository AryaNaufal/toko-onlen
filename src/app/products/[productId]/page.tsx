import { Metadata } from "next"

type Props = {
  params: {
    productId: string
  }
}

// Generate Metadata with params
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const title = await new Promise(resolve => {
    setTimeout(() => resolve(`iPhone ${params.productId}`), 100);
  });
  return {
    title: `Product ${title}`,
    description: 'Generated by create next app',
  }
}

export default function ProductDetails({ params }: Props) {
  return <h1>Product Details {params.productId}</h1>
}