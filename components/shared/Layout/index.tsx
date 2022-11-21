import React, { ReactNode } from 'react'

import HeaderNav from '@components/shared/HeaderNav'
import ProjectLayoutContextProvider from '@components/contexts/ProjectLayoutContext'

import styles from './Layout.module.scss'

type TLayoutProps = {
  children: ReactNode
}

function Layout({ children }: TLayoutProps) {
  return (
    <ProjectLayoutContextProvider>
      <HeaderNav />
      <div className={styles.root}>{children}</div>
    </ProjectLayoutContextProvider>
  )
}

export default Layout
