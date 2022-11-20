import React, { ReactNode } from 'react'

import HeaderNav from '@components/shared/HeaderNav'
import FooterNav from '@components/shared/FooterNav'

import styles from './Layout.module.scss'

type TLayoutProps = {
  children: ReactNode
}

function Layout({ children }: TLayoutProps) {
  return (
    <>
      <HeaderNav />
      <div className={styles.root}>{children}</div>
    </>
  )
}

export default Layout
