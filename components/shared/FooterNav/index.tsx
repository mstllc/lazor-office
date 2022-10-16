import React from 'react'

import TextLogo from '@components/shared/TextLogo'
import { FooterNavLinks } from '@constants/nav-links'

import styles from './FooterNav.module.scss'

function FooterNav() {
  return (
    <div className={styles.root}>
      <div className={styles.nav}>
        <nav>
          {FooterNavLinks.map((link, index) => (
            <a key={index} className={!link.desktopFooter ? 'lg:hidden' : ''} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>

      <div className={styles.logo}>
        <TextLogo />
      </div>

      <div className={styles.legal}>
        <p>© Lazor Office Inc. {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default FooterNav
