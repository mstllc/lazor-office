import React, { ReactNode } from 'react'

import HeaderNav from '@components/shared/HeaderNav'
import FooterNav from '@components/shared/FooterNav'

type TLayoutProps = {
  children: ReactNode
}

function Layout({ children }: TLayoutProps) {
  return (
    <>
      <HeaderNav />
      <div>{children}</div>
      <FooterNav />
    </>
  )
}

export default Layout
