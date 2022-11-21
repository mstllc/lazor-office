import { TypeProjectFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

import styles from './ProjectGridItem.module.scss'
import { useProjectLayout } from '@components/contexts/ProjectLayoutContext'

type TProps = {
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  index: number
  cropWidth: number
  cropHeight: number
  style?: React.CSSProperties
}

function ProjectGridItem({ project, index, cropWidth, cropHeight, style }: TProps) {
  const imageFile = project.fields.heroImage!.fields.image!.fields.file!
  const rootRef = useRef<HTMLDivElement>(null)
  const imageControls = useAnimationControls()
  const fadeControls = useAnimationControls()
  const { mode, nextMode, transitioningOut, transitioningIn, transitionOutComplete, transitionInComplete } = useProjectLayout()

  const onImageAnimationComplete = useCallback(() => {
    if (transitioningOut) {
      transitionOutComplete()
    }
  }, [transitioningOut, transitionOutComplete])

  const onFadeAnimationComplete = useCallback(() => {
    if (transitioningIn) {
      transitionInComplete()
    }
  }, [transitioningIn, transitionInComplete])

  useEffect(() => {
    if (!transitioningOut) return

    const gridItem = rootRef.current
    const listItem = document.querySelector(`[data-list-item][data-id="${project.sys.id}"]`)
    const gridItemImage = gridItem!.querySelector('img')
    const listItemImage = listItem!.querySelector('img')
    const gridRect = gridItemImage!.getBoundingClientRect()
    const listRect = listItemImage!.getBoundingClientRect()

    if (nextMode === 'list') {
      const t = { x: listRect.x - gridRect.x, y: listRect.y - gridRect.y, scale: listRect.width / gridRect.width, opacity: 1 }
      if (t.scale !== 1) {
        imageControls.set({ x: 0, y: 0, scale: 1, opacity: 1 })
        imageControls.start(t)
        fadeControls.set({ opacity: 1 })
        fadeControls.start({ opacity: 0 })
      }
    }

    if (nextMode === 'grid') {
      const t = { x: listRect.x - gridRect.x, y: listRect.y - gridRect.y, scale: listRect.width / gridRect.width, opacity: 1 }
      if (t.scale !== 1) {
        imageControls.set(t)
        imageControls.start({ x: 0, y: 0, scale: 1, opacity: 1 })
      }
    }
  }, [transitioningOut, nextMode, imageControls, fadeControls, project.sys.id])

  useEffect(() => {
    if (!transitioningIn) return

    if (nextMode === 'grid') {
      fadeControls.set({ opacity: 0 })
      fadeControls.start({ opacity: 1 })
    }
  }, [transitioningIn, nextMode, fadeControls])

  return (
    <div ref={rootRef} className={styles.root} style={style} data-grid-item data-id={project.sys.id}>
      <motion.img
        className={styles.image}
        src={`https:${imageFile.url}?fit=crop&f=center&w=${cropWidth}&h=${cropHeight}`}
        alt={project.fields.heroImage!.fields.title}
        animate={imageControls}
        initial={{ opacity: mode === 'list' ? 0 : 1 }}
        onAnimationComplete={onImageAnimationComplete}
      />
      <motion.div
        className={styles.details}
        animate={fadeControls}
        initial={{ opacity: mode === 'list' ? 0 : 1 }}
        onAnimationComplete={onFadeAnimationComplete}
      >
        <p className={styles.index}>{`${index + 1}`.padStart(2, '0')}</p>
        <p className={styles.name}>{project.fields.projectName}</p>
      </motion.div>
    </div>
  )
}

export default ProjectGridItem
