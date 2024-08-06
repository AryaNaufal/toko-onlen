export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen justify-center items-center bg-slate-100">
      {children}
    </div>
  );
}
