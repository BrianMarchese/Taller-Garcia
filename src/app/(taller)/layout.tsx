import { Footer, NavBar } from "@/components";

export default function TallerLayout({ children }: {
    children: React.ReactNode;
   }) {
     return (
       <main className="min-h-screen bg-gray-500">
         <NavBar />
         <div>
           { children }
           <Footer />
         </div>
       </main>
     );
   }