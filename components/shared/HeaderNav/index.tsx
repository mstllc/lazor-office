import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import TextLogo from '@components/shared/TextLogo'
import Icon from '@components/shared/Icon'
import { DesktopHeaderNavLinks, MobileHeaderNavLinks } from '@constants/nav-links'

import styles from './HeaderNav.module.scss'
import variables from '@styles/variables.module.scss'

function HeaderNav() {
  const [open, setOpen] = useState(false)

  return (
    <motion.div className={styles.root} animate={{ color: open ? variables.white : variables.black }}>
      <div className={styles['gallery-toggle']}>
        <div>
          <a href="#"><span><Icon name="Gallery" /></span>Gallery View</a>
          <span>/</span>
          <a href="#"><span><Icon name="List" /></span>List View</a>
        </div>
      </div>

      <div className={styles.logo}>
        <Link href="/"><a onClick={() => setOpen(false)}><TextLogo /></a></Link>
      </div>

      <nav className={styles.nav}>
        {DesktopHeaderNavLinks.map((link, index) => (
          <a key={index} href={link.href}>{link.label}</a>
        ))}
      </nav>

      {/* Mobile Overlay Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles['mobile-nav']}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav>
              {MobileHeaderNavLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <p>© Lazor Office Inc. {new Date().getFullYear()}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles['mobile-toggle-button']}>
        <motion.button onClick={() => setOpen(!open)} animate={{ rotate: open ? 45 : 0 }}>
          <Icon name="Plus" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default HeaderNav
