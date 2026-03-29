import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth";
import { useUserUpdate } from "@/stores/user";
import { Loader2, LogOut, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const PROFILE = {
    initials: "CT",
    name: "Conta teste",
    email: "conta@teste.com",
} as const;

export default function Profile() {
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    const [name, setName] = useState(user?.name);
    const [isLoading, setIsLoading] = useState(false);
    const { submitUpdate, loading } = useUserUpdate();

    console.log("user", user);

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

    async function handleSubmitUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if (!name) {
                toast.error("Nome é obrigatório");
                return;
            }
            setIsLoading(true);
            const result = await submitUpdate({ name: name });
            if (result) {
                toast.success("Usuário atualizado com sucesso");
                setName(name);
            } else {
                toast.error("Erro ao atualizar usuário");
            }
        } catch (error) {
            toast.error("Erro ao atualizar usuário");
        } finally {
            setIsLoading(false);
        }
    }

    const handleLogout = async () => {
        await logout();
        toast.success('Sessão encerrada com sucesso');
    }
    return (
        <div className="flex w-full flex-col items-center py-8">
            <Card className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-sm ring-0">
                <CardHeader className="space-y-4 border-b border-gray-100 px-8 pb-8 pt-10 text-center sm:px-10">
                    <div
                        className="mx-auto flex size-20 shrink-0 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold tracking-tight text-gray-600"
                        aria-hidden
                    >
                        {initialsFromName(user?.name)}
                    </div>
                    <div className="space-y-1">
                        <h1 className="font-sans text-lg font-bold text-gray-900">{user?.name}</h1>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6 px-8 pb-10 pt-8 sm:px-10">
                    <form
                        className="space-y-5"
                        onSubmit={handleSubmitUpdate}
                    >
                        <div className="space-y-2">
                            <Label htmlFor="profile-name" className="text-sm font-medium text-gray-800">
                                Nome completo
                            </Label>
                            <div className="relative">
                                <User
                                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
                                    strokeWidth={2}
                                    aria-hidden
                                />
                                <Input
                                    id="profile-name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-11 rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-base text-gray-900 shadow-none placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profile-email" className="text-sm font-medium text-gray-800">
                                E-mail
                            </Label>
                            <div className="relative">
                                <Mail
                                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                                    strokeWidth={2}
                                    aria-hidden
                                />
                                <Input
                                    id="profile-email"
                                    name="email"
                                    type="email"
                                    readOnly
                                    defaultValue={user?.email}
                                    aria-readonly="true"
                                    className="h-11 cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-base text-gray-500 shadow-none"
                                />
                            </div>
                            <p className="text-xs text-gray-500">O e-mail não pode ser alterado</p>
                        </div>

                        <Button
                            type="submit"
                            className="h-11 w-full rounded-lg bg-brand-base text-base font-semibold text-white hover:bg-brand-dark"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Salvar alterações"}
                            
                        </Button>
                    </form>

                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full gap-2 rounded-lg border-gray-200 bg-white text-base font-medium text-gray-900 shadow-none hover:bg-gray-50"
                        onClick={handleLogout}
                    >
                        <LogOut className="size-4 text-red-base" strokeWidth={2} aria-hidden />
                        Sair da conta
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
