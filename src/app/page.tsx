import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function Home() {
  const session: any = await getServerSession(authOptions as any);
  return (
    <main className="container mx-auto items-center justify-center flex pt-5">
      <section className='w-52 sm:w-80 md:w-[27rem] lg:w-[35rem'>
        <div className="flex flex-col flex-wrap gap-2">
          <p>{JSON.stringify(session)}</p>
        </div>
      </section>
    </main>
  );
};