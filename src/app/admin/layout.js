import AdminHeader from "@/src/components/AdminHeader";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <AdminHeader />
            <main className="flex-1 bg-gray-100 overflow-auto flex flex-col">
                <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">K</div>
                        <span className="font-bold text-gray-800 hidden sm:inline">Kunj Bihari Collection Admin</span>
                    </div>
                </header>
                <div className="p-4 md:p-8">
                    <Toaster position="top-right" />
                    {children}
                </div>
            </main>
        </div>
    );
}
