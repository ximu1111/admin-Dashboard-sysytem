import { defineStore } from 'pinia'
import { min, setProperty } from '@/utils'

interface ThemeState {
  primary: string
  success: string
  warning: string
  danger: string
  info: string
  headerBgColor: string
  headerTextColor: string
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    primary: '',
    success: '',
    warning: '',
    danger: '',
    info: '',
    headerBgColor: '#242f42',
    headerTextColor: '#fff',
  }),

  getters: {},

  actions: {
    initTheme() {
      ;['primary', 'success', 'warning', 'danger', 'info'].forEach((type) => {
        const color = localStorage.getItem(`theme-${type}`) || ''
        if (color) {
          this.setPropertyColor(color, type)
        }
      })

      const headerBgColor = localStorage.getItem('header-bg-color')
      if (headerBgColor) {
        this.setHeaderBgColor(headerBgColor)
      }

      const headerTextColor = localStorage.getItem('header-text-color')
      if (headerTextColor) {
        this.setHeaderTextColor(headerTextColor)
      }
    },

    resetTheme() {
      const defaultColors = {
        primary: '#409EFF',
        success: '#67C23A',
        warning: '#E6A23C',
        danger: '#F56C6C',
        info: '#909399',
      }

      Object.entries(defaultColors).forEach(([type, color]) => {
        this.setPropertyColor(color, type)
      })
    },

    setPropertyColor(color: string, type: string = 'primary') {
      // 类型安全的属性设置
      if (type === 'primary') this.primary = color
      else if (type === 'success') this.success = color
      else if (type === 'warning') this.warning = color
      else if (type === 'danger') this.danger = color
      else if (type === 'info') this.info = color

      setProperty(`--el-color-${type}`, color)
      localStorage.setItem(`theme-${type}`, color)
      this.setThemeLight(type, color)
    },

    setThemeLight(type: string = 'primary', color?: string) {
      const baseColor = color || this[type as keyof ThemeState]

      if (!baseColor) return
      ;[3, 5, 7, 8, 9].forEach((v) => {
        const lightColor = min('#ffffff', baseColor, v / 10)
        setProperty(`--el-color-${type}-light-${v}`, lightColor)
      })

      const darkColor = min('#000000', baseColor, 0.2)
      setProperty(`--el-color-${type}-dark-2`, darkColor)
    },

    setHeaderBgColor(color: string) {
      this.headerBgColor = color
      setProperty('--header-bg-color', color)
      localStorage.setItem('header-bg-color', color)
    },

    setHeaderTextColor(color: string) {
      this.headerTextColor = color
      setProperty('--header-text-color', color)
      localStorage.setItem('header-text-color', color)
    },
  },
})
