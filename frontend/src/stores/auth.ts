import type { LoginInput, RegisterInput, User } from "@/types";
import { apolloClient } from "@/lib/graphql/apollo";
import { REGISTER_MUTATION } from "@/lib/graphql/mutations/register";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { LOGIN_MUTATION } from "@/lib/graphql/mutations/login";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    refreshToken: string | null;
    login: (loginInput: LoginInput) => Promise<boolean>;
    register: (registerInput: RegisterInput) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}


type LoginMutationData = {
    login: {
        token: string
        refreshToken: string
        user: User
    }
}

type RegisterMutationData = {
    register: {
      token: string
      refreshToken: string
      user: User
    }
  }

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            login: async (loginInput: LoginInput) => {
                try {
                    const { data } = await apolloClient.mutate<LoginMutationData, { input: LoginInput }>({
                        mutation: LOGIN_MUTATION,
                        variables: { input: loginInput },
                    });

                    if (data?.login) {
                        const { token, user } = data.login as LoginMutationData['login']
                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                        })
                        return true
                    }
                    
                    return false;
                    
                }  catch (error) {
                    console.error('Erro ao fazer login:', error)
                    return false
                }
            },
            logout: () =>
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    isAuthenticated: false,
                }),
            setIsLoading: (isLoading) => set({ isLoading }),
            register: async (registerInput: RegisterInput) => {
                set({ isLoading: true });
                try {
                    const { data } = await apolloClient.mutate<RegisterMutationData>({
                        mutation: REGISTER_MUTATION,
                        variables: { input: registerInput },
                    });
          
                    if (data?.register) {
                        const { token, user } = data.register as RegisterMutationData['register']
                        localStorage.setItem('token', token)
                        set({
                            user: {
                              id: user.id,
                              name: user.name,
                              email: user.email,
                              role: user.role,
                              createdAt: user.createdAt,
                              updatedAt: user.updatedAt
                            },
                            token,
                            isAuthenticated: true
                          })
                        return true
                    }
                    return false
                } catch (error) {
                    console.error('Erro ao registrar usuário:', error)
                    return false
                }
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state?.token) {
                    localStorage.setItem("token", state.token);
                }
            },
        },
    ),
);
