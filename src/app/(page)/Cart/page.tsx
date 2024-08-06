import { auth } from "@clerk/nextjs/server";
import CartProductList from "./component";

export default function Cart() {
  const { userId } = auth();

  return (
    <section className="overflow-hidden h-full p-3">
      <CartProductList userId={userId} />
    </section>
  );
}
