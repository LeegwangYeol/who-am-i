import { proxy, useSnapshot, subscribe } from "valtio"

const STORAGE_KEY = "theme"

type ThemeValue = "dark" | "light"
type Preference = ThemeValue | "system"

interface ThemeState {
  /** 사용자가 명시적으로 선택한 값 ("system" = OS 기본을 따름) */
  preference: Preference
  /** 실제 적용되는 테마 (system을 OS와 결합해 산출) */
  resolved: ThemeValue
  /** 기존 컴포넌트 호환용 */
  isDarkTheme: boolean
}

function getSystemTheme(): ThemeValue {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function readPreference(): Preference {
  if (typeof window === "undefined") return "system"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "dark" || stored === "light" || stored === "system") {
      return stored
    }
  } catch {
    // localStorage 접근 실패 (Safari private mode 등)
  }
  return "system"
}

function resolve(preference: Preference): ThemeValue {
  return preference === "system" ? getSystemTheme() : preference
}

const initialPreference = readPreference()
const initialResolved = resolve(initialPreference)

export const themeStore = proxy<ThemeState>({
  preference: initialPreference,
  resolved: initialResolved,
  isDarkTheme: initialResolved === "dark",
})

// preference 변경 시 resolved/isDarkTheme 동기화 + 영속화
subscribe(themeStore, () => {
  const resolved = resolve(themeStore.preference)
  if (themeStore.resolved !== resolved) {
    themeStore.resolved = resolved
  }
  const isDark = resolved === "dark"
  if (themeStore.isDarkTheme !== isDark) {
    themeStore.isDarkTheme = isDark
  }
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, themeStore.preference)
    } catch {
      // ignore
    }
    document.documentElement.classList.toggle("dark", isDark)
    document.documentElement.style.colorScheme = isDark ? "dark" : "light"
  }
})

// 시스템 테마 변화 추적 (사용자가 "system"을 선택한 경우만 반영)
if (typeof window !== "undefined") {
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const onSystemChange = () => {
    if (themeStore.preference === "system") {
      const resolved = getSystemTheme()
      themeStore.resolved = resolved
      themeStore.isDarkTheme = resolved === "dark"
      document.documentElement.classList.toggle("dark", resolved === "dark")
      document.documentElement.style.colorScheme = resolved
    }
  }
  media.addEventListener?.("change", onSystemChange)
}

export const setThemePreference = (preference: Preference) => {
  themeStore.preference = preference
}

export const toggleTheme = () => {
  // dark ↔ light 토글. system이었다면 현재 보이는 것의 반대로 명시 전환.
  themeStore.preference = themeStore.resolved === "dark" ? "light" : "dark"
}

export const useThemeStore = () => useSnapshot(themeStore)
