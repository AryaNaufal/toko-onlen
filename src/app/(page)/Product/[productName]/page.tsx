import DetailProduct from "@/src/components/DetailProduct";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: {
    productName: string;
  };
};

export default function ProductDetails() {
  const { userId } = auth();
  console.log(userId);
  
  return (
    <section className="h-full overflow-hidden">
      <DetailProduct userId={userId} />
    </section>
  );
}
