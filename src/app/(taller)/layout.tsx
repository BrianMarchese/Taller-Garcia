import { FloatButtonWhatsapp, Footer, NavBar } from "@/components";
import { ToastContainer } from "react-toastify";


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
         <FloatButtonWhatsapp />
         <ToastContainer />
       </main>
     );
   }