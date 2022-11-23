import { TypeProjectFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'

import styles from './ProjectGridItem.module.scss'
import { useProjectLayout } from '@components/contexts/ProjectLayoutContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

type TProps = {
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  index: number
  cropWidth: number
  cropHeight: number
  style?: React.CSSProperties
}

function ProjectGridItem({ project, index, cropWidth, cropHeight, style }: TProps) {
  const router = useRouter()
  const imageFile = project.fields.heroImage!.fields.image!.fields.file!
  const rootRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, { margin: '5% 0px 5% 0px' })
  const imageControls = useAnimationControls()
  const fadeControls = useAnimationControls()
  const { mode, nextMode, projectSlug, transitioning, transitioningOut, transitioningIn, transitionOutComplete, transitionInComplete, setProjectSlug, setMode } = useProjectLayout()

  const onClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()

    if (!transitioning) {
      console.log('here')
      setProjectSlug(project.fields.slug)
      setMode('project')
    }
  }, [transitioning, setProjectSlug, setMode, project])

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

    if (nextMode === 'list') {
      const gridItem = rootRef.current
      const listItem = document.querySelector(`[data-list-item][data-id="${project.sys.id}"]`)
      const gridItemImage = gridItem!.querySelector('img')
      const listItemImage = listItem!.querySelector('img')
      const gridRect = gridItemImage!.getBoundingClientRect()
      const listRect = listItemImage!.getBoundingClientRect()

      const t = { x: listRect.x - gridRect.x, y: listRect.y - gridRect.y, scale: listRect.width / gridRect.width, opacity: 1 }
      if (t.scale !== 1) {
        imageControls.set({ x: 0, y: 0, scale: 1, opacity: 1 })
        if (isInView) {
          imageControls.start(t)
        } else {
          imageControls.start({ x: 0, y: 0, scale: 1, opacity: 0 })
        }
        fadeControls.set({ opacity: 1 })
        fadeControls.start({ opacity: 0 })
      }
    }

    if (nextMode === 'grid') {
      const gridItem = rootRef.current
      const listItem = document.querySelector(`[data-list-item][data-id="${project.sys.id}"]`)
      const gridItemImage = gridItem!.querySelector('img')
      const listItemImage = listItem!.querySelector('img')
      const gridRect = gridItemImage!.getBoundingClientRect()
      const listRect = listItemImage!.getBoundingClientRect()

      const t = { x: listRect.x - gridRect.x, y: listRect.y - gridRect.y, scale: listRect.width / gridRect.width, opacity: 1 }
      if (t.scale !== 1) {
        imageControls.set(t)
        window.requestAnimationFrame(() => {
          imageControls.start({ x: 0, y: 0, scale: 1, opacity: 1 })
        })
      }
    }

    if (nextMode === 'project') {
      if (projectSlug === project.fields.slug && isInView) {
        const gridItem = rootRef.current
        const gridItemImage = gridItem!.querySelector('img')
        const projectImage = document.querySelector('[data-project-hero')
        const gridRect = gridItemImage!.getBoundingClientRect()
        const projectRect = projectImage!.getBoundingClientRect()
        const imageFile = project.fields.heroImage!.fields.image!.fields.file!
        const crop = project.fields.heroImage!.fields.projectListCrop as { width: number, height: number }
        const scale = (crop.width * window.innerWidth) / gridRect.width
        const gridCenter = [gridRect.x + (gridRect.width / 2), gridRect.y + (gridRect.height / 2)]
        const projectCenter = [projectRect.x + (projectRect.width / 2), projectRect.y + (projectRect.height / 2)]
        const difference = [projectCenter[0] - gridCenter[0], projectCenter[1] - gridCenter[1]]

        imageControls.set({ x: 0, y: 0, scale: 1, opacity: 1 })
        imageControls.start({ x: difference[0], y: difference[1], scale, opacity: 1, transformOrigin: 'center center' })
      } else {
        imageControls.set({ x: 0, y: 0, scale: 1, opacity: 1 })
        imageControls.start({ x: 0, y: 0, scale: 1, opacity: 0 })
      }

      fadeControls.set({ opacity: 1 })
      fadeControls.start({ opacity: 0 })
    }
  }, [transitioningOut, nextMode, projectSlug, imageControls, fadeControls, isInView, project])

  useEffect(() => {
    if (!transitioningIn) return

    if (nextMode === 'grid') {
      fadeControls.set({ opacity: 0 })
      fadeControls.start({ opacity: 1 })
    }
  }, [transitioningIn, nextMode, fadeControls, isInView])

  return (
    <div ref={rootRef} className={styles.root} style={style} data-grid-item data-id={project.sys.id}>
      <a href={`/projects/${project.fields.slug}`} onClick={onClick}>
        <motion.img
          className={styles.image}
          src={`https:${imageFile.url}?fit=crop&f=center&w=${cropWidth}&h=${cropHeight}`}
          alt={project.fields.heroImage!.fields.title}
          animate={imageControls}
          initial={{ opacity: mode === 'list' ? 0 : 1 }}
          transition={{ ease: 'easeInOut' }}
          onAnimationComplete={onImageAnimationComplete}
        />
      </a>
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
