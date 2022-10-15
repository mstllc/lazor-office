import React, { ReactNode } from 'react'
import HeaderNav from '@components/shared/HeaderNav'

type TLayoutProps = {
  children: ReactNode
}

function Layout({ children }: TLayoutProps) {
  return (
    <>
      <HeaderNav />
      <div>{children}</div>
      <p>After</p>
    </>
  )
}

export default Layout
