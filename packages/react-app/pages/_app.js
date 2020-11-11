import React, { useEffect, useState } from 'react'

import '../styles/app.css'
import Store from '../store'
import { Provider } from 'react-redux'

export default function MyApp({ Component, pageProps }) {
  const [theme, themeSet] = useState(null)

  useEffect(() => {
    const theme = localStorage.getItem('THEME') || 'light'
    themeSet(theme)
  }, [])

  const changeTheme = (theme) => {
    themeSet(theme)
    localStorage.setItem('THEME', theme)
  }

  useEffect(() => {
    if (!theme) return
    const $html = document.querySelector('html')
    $html.classList.remove('light')
    $html.classList.remove('dark')
    $html.classList.remove('dim')
    $html.classList.add(theme.toString())
  }, [theme])

  return (
    <Provider value={{ theme, changeTheme }} store={Store}>
      <Component {...pageProps} />
    </Provider>
  )
}
