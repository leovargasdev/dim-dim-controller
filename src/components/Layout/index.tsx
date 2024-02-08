import React from 'react'

import { Header } from './Header'
import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.container}>
    <Header />

    <main>{children}</main>
  </div>
)
