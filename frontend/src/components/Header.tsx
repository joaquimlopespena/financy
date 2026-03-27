import logo from "../assets/logo.svg";

const navItems = [
    { label: "Dashboard", href: "#", active: true },
    { label: "Transações", href: "#", active: false },
    { label: "Categorias", href: "#", active: false },
] as const;

export function Header() {
    return (
        <header className="relative border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-16 max-w-[1600px] items-center px-6 lg:px-10">
                {/* Logo — esquerda */}
                <div className="flex min-w-0 flex-1 items-center">
                    <a href="#" className="flex shrink-0 items-center gap-2">
                        <img src={logo} alt="Financy" className="h-9 w-auto" />
                    </a>
                </div>

                {/* Navegação — centro (sobre o viewport) */}
                <nav
                    className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8"
                    aria-label="Principal"
                >
                    <ul className="flex items-center gap-8">
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

                {/* Avatar — direita */}
                <div className="flex flex-1 items-center justify-end">
                    <div
                        className="flex size-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-800"
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
