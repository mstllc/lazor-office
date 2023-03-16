import React, { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import TextLogo from '@components/shared/TextLogo'
import Icon from '@components/shared/Icon'
import { DesktopHeaderNavLinks, MobileHeaderNavLinks } from '@constants/nav-links'
import { TProjectLayoutContextLayoutMode, useProjectLayout } from '@components/contexts/ProjectLayoutContext'

import styles from './HeaderNav.module.scss'
import variables from '@styles/variables.module.scss'
import { useRouter } from 'next/router'

function HeaderNav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { mode, nextMode, setMode, transitioning } = useProjectLayout()

  const onHomePage = useMemo(() => {
    return router.pathname === '/'
  }, [router])

  const onModeClick = useCallback((e: React.MouseEvent, newMode: TProjectLayoutContextLayoutMode) => {
    e.preventDefault()

    if (onHomePage && newMode !== mode) {
      setMode(newMode)
    } else {
      setMode(newMode, true)
      router.push(`/?mode=${newMode}`)
    }
  }, [mode, setMode, router, onHomePage])

  return (
    <motion.div className={styles.root} animate={{ color: open ? variables.white : variables.black }}>
      <div className={styles['gallery-toggle']}>
        <div>
          <a href="#" className={onHomePage && mode === 'grid' && !transitioning ? 'underline' : undefined} onClick={(e) => onModeClick(e, 'grid')}><span><Icon name="Gallery" /></span>Gallery View</a>
          <span>/</span>
          <a href="#" className={onHomePage && mode === 'list' && !transitioning ? 'underline' : undefined} onClick={(e) => onModeClick(e, 'list')}><span><Icon name="List" /></span>List View</a>
        </div>
      </div>

      <div className={styles.logo}>
        <Link href="/?mode=grid"><a className="lg:hidden" onClick={() => { setMode('grid', true); setOpen(false); }}><TextLogo /></a></Link>
        <Link href="/"><a className="hidden lg:inline"><TextLogo /></a></Link>
      </div>

      <nav className={styles.nav}>
        {DesktopHeaderNavLinks.map((link, index) => (
          <Link key={index} href={link.href}>
            <a>{link.label}</a>
          </Link>
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
                  onClick={() => {
                    setOpen(false)
                  }}
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
