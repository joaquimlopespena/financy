import { useState } from "react";
import { Menu } from "lucide-react";
import logo from "../assets/logo.svg";
import { Button } from "./ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import { cn } from "../lib/utils";

const navItems = [
    { label: "Dashboard", href: "#", active: false},
    { label: "Transações", href: "#", active: false },
    { label: "Categorias", href: "#", active: false },
] as const;

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="relative border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 w-full max-w-[calc(100%-2rem)] items-center gap-3 sm:px-6 lg:px-10">
                {/* Logo — esquerda */}
                <div className="flex min-w-0 flex-1 items-center">
                    <a href="#" className="flex shrink-0 items-center gap-2">
                        <img src={logo} alt="Financy" className="h-8 w-auto sm:h-9" />
                    </a>
                </div>

                {/* Navegação — centro (somente desktop; evita colisão com o logo no mobile) */}
                <nav
                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
                    aria-label="Principal"
                >
                    <ul className="flex items-center gap-6 lg:gap-8">
                        {navItems.map(({ label, href, active }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className={
                                        active
                                            ? "text-sm font-medium text-brand-base"
                                            : "text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
                                    }
                                    aria-current={active ? "page" : undefined}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Direita: menu mobile + avatar */}
                <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
                    <Drawer direction="right" open={mobileOpen} onOpenChange={setMobileOpen}>
                        <DrawerTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="shrink-0 text-gray-700 md:hidden"
                                aria-label="Abrir menu"
                                aria-expanded={mobileOpen}
                                aria-controls="mobile-nav"
                            >
                                <Menu className="size-5" />
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent
                            id="mobile-nav"
                            className="flex h-full max-h-screen flex-col border-l border-gray-200 bg-white px-0"
                        >
                            <DrawerHeader className="border-b border-gray-100 text-left">
                                <DrawerTitle className="text-base font-semibold text-gray-800">
                                    Menu
                                </DrawerTitle>
                            </DrawerHeader>
                            <nav className="flex flex-col gap-1 p-4" aria-label="Principal">
                                {navItems.map(({ label, href, active }) => (
                                    <DrawerClose key={label} asChild>
                                        <a
                                            href={href}
                                            className={cn(
                                                "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                                                active
                                                    ? "bg-gray-100 text-brand-base"
                                                    : "text-gray-700 hover:bg-gray-50",
                                            )}
                                            aria-current={active ? "page" : undefined}
                                        >
                                            {label}
                                        </a>
                                    </DrawerClose>
                                ))}
                            </nav>
                        </DrawerContent>
                    </Drawer>

                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-800 sm:size-10 sm:text-sm"
                        role="img"
                        aria-label="Perfil do usuário"
                    >
                        CT
                    </div>
                </div>
            </div>
        </header>
    );
}
