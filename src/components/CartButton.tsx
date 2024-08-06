"use client";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function CartButton() {
  const [qty, setQty] = useState(1);

  const increment = () => {
    setQty(qty + 1);
  };

  const decrement = () => {
    setQty(qty - 1);

    if (qty < 1) {
      setQty(0);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Cart</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Cart List</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Card>
            <CardHeader className="flex flex-row gap-2 p-0 items-center">
              <Image
                src="https://i.pinimg.com/236x/6a/7e/e2/6a7ee2458cb37878ce116bf1bf5a7bdd.jpg"
                alt="iphone"
                width={400}
                height={400}
                className="w-20 h-full object-cover md:w-40 rounded-tl-md"
              />
              <div className="w-full flex justify-center">
                <CardTitle className="text-xl sm:text-3xl">
                  Card Title
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex justify-end space-y-1.5 p-2">
              <div className="flex items-center gap-3 border p-2 rounded-md">
                <button onClick={decrement}>-</button>
                {qty}
                <button onClick={increment}>+</button>
              </div>
            </CardContent>
            {/* <CardFooter className="flex justify-end space-y-1.5 p-6">
              <div className="flex items-center gap-3 border p-2 rounded-md">
                <button onClick={decrement}>-</button>
                {qty}
                <button onClick={increment}>+</button>
              </div>
            </CardFooter> */}
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
