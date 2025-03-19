import { proxy, useSnapshot } from 'valtio';

// 테마 상태를 저장할 스토어 생성
interface ThemeState {
  isDarkTheme: boolean;
}

// 초기 상태 설정
export const themeStore = proxy<ThemeState>({
  isDarkTheme: false,
});

// 테마 토글 함수
export const toggleTheme = () => {
  themeStore.isDarkTheme = !themeStore.isDarkTheme;
};

// 테마 스토어를 사용하기 위한 훅
export const useThemeStore = () => {
  return useSnapshot(themeStore);
};
