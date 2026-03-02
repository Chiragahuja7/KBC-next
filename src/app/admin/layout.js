import AdminHeader from "@/src/components/AdminHeader";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <AdminHeader />
            <main className="flex-1 bg-gray-100 overflow-auto">
                <Toaster position="top-right" />
                {children}
            </main>
        </div>
    );
}
