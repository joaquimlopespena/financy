import { Header } from "./Header"
import { Toaster } from "./ui/sonner"

interface LayoutProps {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="mx-auto flex-1 mt-8 w-full max-w-[calc(100%-2rem)] items-center gap-3 sm:px-6 lg:px-10">
                {children}
            </main>
            <Toaster />
        </div>
    )
}
