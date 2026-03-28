import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, LogIn, Mail, Loader2, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import logo from "../../assets/logo.svg";
import { useAuthStore } from "../../stores/auth";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Registrar() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const register = useAuthStore((state) => state.register);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await register({ name, email, password });

            console.log(result);
            if (result) {
                toast.success('Usuário registrado com sucesso');
            } else {
                toast.error('Erro ao registrar usuário');
            }
        } catch (error: any) {
            console.error('Erro ao registrar usuário:', error)
            toast.error("Erro ao realizar o cadastro")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-4 py-10">
            <img src={logo} alt="Financy" className="h-auto w-44" />

            <Card
                className={cn(
                    "w-full max-w-md rounded-xl border border-gray-200 bg-white py-0 shadow-sm ring-0",
                    "sm:max-w-lg",
                )}
            >
                <CardHeader className="space-y-2 px-8 pt-10 text-center sm:px-10">
                    <CardTitle className="font-sans text-2xl font-bold tracking-tight text-gray-800">
                        Criar conta
                    </CardTitle>
                    <CardDescription className="text-base font-normal text-gray-500">
                        Comece a controlar suas finanças ainda hoje
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pb-10 pt-6 px-3 sm:px-10">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-bold text-gray-800">
                                Nome completo
                            </Label>
                            <div className="relative">
                                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
                                    aria-hidden
                                />
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                    placeholder="Seu nome completo"
                                    className="h-10 rounded-lg border-gray-200 bg-white pl-10 pr-3 text-base placeholder:text-gray-400 md:text-base"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-bold text-gray-800">
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
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-bold text-gray-800">
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
                                    autoComplete="new-password"
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
                            <p className="text-sm text-gray-500">
                                A senha deve ter no mínimo 8 caracteres
                            </p>
                        </div>

                        <Button type="submit" className="h-10 w-full text-base font-bold" disabled={loading}>
                            {loading ? <Loader2 className="size-4 animate-spin" /> : 'Cadastrar'}
                        </Button>
                    </form>

                    <div className="relative flex items-center gap-4">
                        <span className="h-px flex-1 bg-gray-200" />
                        <span className="text-sm text-gray-400">ou</span>
                        <span className="h-px flex-1 bg-gray-200" />
                    </div>
                    <div className="space-y-3 text-center">
                        <p className="text-sm text-gray-600">Já tem uma conta?</p>
                        <Button variant="outline" className="h-10 w-full gap-2 border-gray-200 bg-white text-base font-medium text-gray-800 hover:bg-gray-50" asChild>
                            <Link to="/login">
                                <LogIn className="size-4" />
                                Fazer login
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    )
}