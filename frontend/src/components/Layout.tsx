import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "./ui/sonner";

export function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100 pb-10">
            <Header />
            <main className="mx-auto mt-8 w-full max-w-[calc(100%-2rem)] flex-1 items-center gap-3 sm:px-6 lg:px-10">
                <Outlet />
            </main>
            <Toaster />
        </div>
    );
}
