'use client'

import { useEffect, useState } from 'react'
import { DarkModeSwitch } from './DarkModeSwitch'
import { useTheme } from './ThemeContext'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'
import { Theme } from './ThemeContext'

const ThemeSwitch = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { theme, setTheme, mounted } = useTheme()
  const [darkModeChecked, setDarkModeChecked] = useState<boolean>(theme === Theme.DARK)

  useEffect(() => {
    setDarkModeChecked(theme === Theme.DARK)
  }, [theme])

  const handleThemeToggle = (isChecked: boolean) => {
    const newTheme = isChecked ? Theme.DARK : Theme.LIGHT
    setTheme(newTheme)
    setDarkModeChecked(isChecked)
  }

  if (!mounted) return null

  return (
    <div className="mr-5">
      <DarkModeSwitch
        checked={darkModeChecked}
        onChange={handleThemeToggle}
        size={24}
        aria-label={t('theme')}
      />
    </div>
  )
}

export default ThemeSwitch
