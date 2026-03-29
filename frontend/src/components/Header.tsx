import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import { useAuthStore } from "@/stores/auth";

const navItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Transações", to: "/transacoes" },
    { label: "Categorias", to: "/categorias" },
] as const;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
        "text-sm font-medium transition-colors",
        isActive ? "text-brand-base" : "text-gray-500 hover:text-gray-700",
    );

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
        "rounded-lg px-3 py-3 text-base font-medium transition-colors",
        isActive ? "bg-gray-100 text-brand-base" : "text-gray-700 hover:bg-gray-50",
    );

/** Duas letras: primeiro + último nome, ou as duas primeiras letras de um único nome (ex.: João → JO). */
function initialsFromName(name: string | null | undefined): string {
    const trimmed = name?.trim();
    if (!trimmed) return "?";
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
        const first = parts[0]?.charAt(0) ?? "";
        const last = parts[parts.length - 1]?.charAt(0) ?? "";
        return (first + last).toUpperCase();
    }
    return trimmed.slice(0, 2).toUpperCase();
}

export function Header() {
    const userName = useAuthStore((state) => (state.user !== null ? state.user.name : null));
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="relative border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 w-full max-w-[calc(100%-2rem)] items-center gap-3 sm:px-6 lg:px-10">
                <div className="flex min-w-0 flex-1 items-center">
                    <Link to="/dashboard" className="flex shrink-0 items-center gap-2">
                        <img src={logo} alt="Financy" className="h-8 w-auto sm:h-9" />
                    </Link>
                </div>

                <nav
                    className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex"
                    aria-label="Principal"
                >
                    <ul className="flex items-center gap-6 lg:gap-8">
                        {navItems.map(({ label, to }) => (
                            <li key={label}>
                                <NavLink to={to} className={navLinkClass}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

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
                                {navItems.map(({ label, to }) => (
                                    <DrawerClose key={label} asChild>
                                        <NavLink to={to} className={mobileNavLinkClass} end={false}>
                                            {label}
                                        </NavLink>
                                    </DrawerClose>
                                ))}
                            </nav>
                        </DrawerContent>
                    </Drawer>

                    <Link
                        to="/perfil"
                        className="flex size-9 min-w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-semibold tracking-tight text-gray-800 sm:size-10 sm:min-w-10 sm:text-xs"
                        aria-label="Perfil do usuário"
                    >
                        {initialsFromName(userName)}
                    </Link>
                </div>
            </div>
        </header>
    );
}
