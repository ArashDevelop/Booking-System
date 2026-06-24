import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  locale: 'en' | 'fa'
  theme: 'light' | 'dark'
  loading: Record<string, boolean>
}

const initialState: UiState = {
  locale: 'en',
  theme: 'light',
  loading: {},
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<'en' | 'fa'>) {
      state.locale = action.payload
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setLoading(state, action: PayloadAction<{ key: string; value: boolean }>) {
      state.loading[action.payload.key] = action.payload.value
    },
  },
})

export const { setLocale, setTheme, toggleTheme, setLoading } = uiSlice.actions
export default uiSlice.reducer
