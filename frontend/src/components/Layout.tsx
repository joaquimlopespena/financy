import { Header } from "./Header"
import { Toaster } from "./ui/sonner"

interface LayoutProps {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Toaster />
        </div>
    )
}
