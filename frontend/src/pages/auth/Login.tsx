import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, UserPlus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import logo from "../../assets/logo.svg";
import { Toaster } from "@/components/ui/sonner";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login({ email, password });

            console.log(result);
            if (result) {
                toast.success('Login realizado com sucesso');
            } else {
                toast.error('Erro ao fazer login');
            }
        } catch (error: any) {
            console.error('Erro ao fazer login:', error)
            toast.error("Erro ao realizar o login")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-100 px-4 py-10">
            <img src={logo} alt="Financy" className="h-auto w-44" />

            <Card
                className={cn(
                    "w-full max-w-md rounded-xl border border-gray-200 bg-white py-0 shadow-sm ring-0",
                    "sm:max-w-lg",
                )}
            >
                <CardHeader className="space-y-2 px-8 pt-10 text-center sm:px-10">
                    <CardTitle className="font-sans text-2xl font-bold tracking-tight text-gray-800">
                        Fazer login
                    </CardTitle>
                    <CardDescription className="text-base font-normal text-gray-500">
                        Entre na sua conta para continuar
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pb-10 pt-6 px-3 sm:px-10">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-800">
                                E-mail
                            </Label>
                            <div className="relative">
                                <Mail
                                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
                                    aria-hidden
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    placeholder="mail@exemplo.com"
                                    className="h-10 rounded-lg border-gray-200 bg-white pl-10 pr-3 text-base placeholder:text-gray-400 md:text-base"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-800">
                                Senha
                            </Label>
                            <div className="relative">
                                <Lock
                                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
                                    aria-hidden
                                />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    placeholder="Digite sua senha"
                                    className="h-10 rounded-lg border-gray-200 bg-white pl-10 pr-11 text-base placeholder:text-gray-400 md:text-base"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4" />
                                    ) : (
                                        <Eye className="size-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <Label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="size-4 rounded border-gray-300 text-brand-base focus:ring-2 focus:ring-brand-base/30"
                                />
                                Lembrar-me
                            </Label>
                            <a
                                href="#"
                                className="text-sm font-medium text-brand-base hover:underline"
                            >
                                Recuperar senha
                            </a>
                        </div>

                        <Button type="submit" className="h-10 py-3 w-full text-base font-medium" disabled={loading}>
                            {loading ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
                        </Button>
                    </form>

                    <div className="relative flex items-center gap-4">
                        <span className="h-px flex-1 bg-gray-200" />
                        <span className="text-sm text-gray-400">ou</span>
                        <span className="h-px flex-1 bg-gray-200" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-normal text-gray-600">Ainda não tem uma conta? </p>
                    </div>

                    <Button variant="outline" className="h-10 w-full gap-2 border-gray-200 bg-white py-3 text-base font-medium text-gray-800 hover:bg-gray-50" asChild>
                        <Link to="/registrar">
                            <UserPlus className="size-4" />
                            Criar conta
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}
