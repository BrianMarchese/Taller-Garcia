export default async function AuthLayout({ children }: {
 children: React.ReactNode;
}) {
    
  return (
    <main className="flex justify-center bg-gray-300">
      <div className="w-full sm:w-[350px] px-10">
        { children }
      </div>
    </main>
  );
}