/**
 * Token usado pelo Apollo (localStorage `token`).
 * Fallback: estado persistido do Zustand em `auth` (evita corrida antes da hidratação).
 */
export function getStoredAuthToken(): string | null {
    if (typeof window === "undefined") return null
    const direct = localStorage.getItem("token")
    if (direct) return direct
    try {
      const raw = localStorage.getItem("auth")
      if (!raw) return null
      const parsed = JSON.parse(raw) as { state?: { token?: string | null } }
      const t = parsed.state?.token
      if (typeof t === "string" && t.length > 0) {
        localStorage.setItem("token", t)
        return t
      }
      return null
    } catch {
      return null
    }
  }