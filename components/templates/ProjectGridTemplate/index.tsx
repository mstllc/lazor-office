import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import { useDebouncedCallback } from 'use-debounce'
import { motion, useAnimationControls } from 'framer-motion'

import { TypeProjectFields, TypeProjectsListFields } from '@services/contentful/types'
import ProjectGridItem from './ProjectGridItem'
import FooterNav from '@components/shared/FooterNav'
import { useBreakpoint } from '@utils/tailwind'

import styles from './ProjectGridTemplate.module.scss'
import { useProjectLayout } from '@components/contexts/ProjectLayoutContext'

const DEFAULT_ITEM_VW_SCALE = 0.55
const DEFAULT_H_GAP = 3
const DEFAULT_V_GAP = 4
const DEFAULT_LABEL_HEIGHT = 36

function vwToVh(vw: number) {
  const windowAspect = window.innerHeight / window.innerWidth
  return ((vw / 100) / windowAspect) * 100
}

type TGridLayout = {
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  index: number
  cropWidth: number
  cropHeight: number
  width: string
  height: string
  top: string
  left: string
  transform: string
}[]

type TProps = {
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

function ProjectGridTemplate({ projectsList }: TProps) {
  const [gridLayout, setGridLayout] = useState<TGridLayout>([])
  const headerRef = useRef<HTMLDivElement>(null)
  const breakpoint = useBreakpoint('lg')
  const [scrollY, setScrollY] = useState(0)
  const [gridHeight, setGridHeight] = useState(0)
  const [grid1Offset, setGrid1Offset] = useState(0)
  const [grid2Offset, setGrid2Offset] = useState(0)
  const { mode, nextMode, transitioning, transitioningOut, transitioningIn, transitionOutComplete, transitionInComplete } = useProjectLayout()
  const fadeControls = useAnimationControls()

  const onWheel = useCallback((e: WheelEvent) => {
    const deltaVW = e.deltaY / window.innerWidth * 100
    const headerOffset = (headerRef.current!.offsetTop + headerRef.current!.offsetHeight) / window.innerWidth * 100
    const newScrollY = scrollY - deltaVW

    if (newScrollY > 0) {
      setScrollY(0)

      return
    } else {
      setScrollY(newScrollY)
    }

    if (deltaVW > 0) {
      // scrolling down
      const toGrid1Bottom = (vwToVh(grid1Offset) + vwToVh(gridHeight) + vwToVh(newScrollY) + vwToVh(headerOffset)) - 100
      const toGrid2Bottom = (vwToVh(grid2Offset) + vwToVh(gridHeight) + vwToVh(newScrollY) + vwToVh(headerOffset)) - 100
      if (toGrid1Bottom < 10 && grid2Offset <= grid1Offset) {
        setGrid2Offset(grid1Offset + gridHeight)
      } else if (toGrid2Bottom < 10 && grid1Offset <= grid2Offset) {
        setGrid1Offset(grid2Offset + gridHeight)
      }
    } else if (newScrollY < -gridHeight) {
      // scrolling up
      const toGrid1Top = (vwToVh(grid1Offset) + vwToVh(newScrollY) + vwToVh(headerOffset))
      const toGrid2Top = (vwToVh(grid2Offset) + vwToVh(newScrollY) + vwToVh(headerOffset))
      if (toGrid1Top > -10 && grid2Offset >= grid1Offset) {
        setGrid2Offset(grid1Offset - gridHeight)
      } else if (toGrid2Top > -10 && grid1Offset >= grid2Offset) {
        setGrid1Offset(grid2Offset - gridHeight)
      }
    }
  }, [scrollY, gridHeight, grid1Offset, grid2Offset])

  useEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  useEffect(() => {
    if (breakpoint && !transitioning && vwToVh(gridHeight) > 100) {
      window.addEventListener('wheel', onWheel)
    }

    return () => {
      window.removeEventListener('wheel', onWheel)
    }
  }, [breakpoint, onWheel, transitioning, gridHeight])

  const calculateGridLayout = useCallback(() => {
    const headerOffset = headerRef.current!.offsetTop + headerRef.current!.offsetHeight
    const labelHeight = DEFAULT_LABEL_HEIGHT / window.innerWidth * 100
    const layout: TGridLayout = []
    let index = 0
    let leftFill = 50
    let rightFill = 50
    let leftHeight = headerOffset / window.innerWidth * 100
    let rightHeight = (headerOffset / window.innerWidth * 100) + ((Math.random() * (3 - 1) + 1) * DEFAULT_V_GAP)
    let fillingLeft = leftHeight <= rightHeight
    for (const project of projectsList.fields.projects!) {
      const imageFile = project.fields.heroImage!.fields.image!.fields.file!
      const crop = project.fields.heroImage!.fields.projectListCrop as { width: number, height: number }
      const cropWidth = Math.round(imageFile.details.image!.width * crop.width)
      const cropHeight = Math.round(imageFile.details.image!.height * crop.height)
      const cropAspect = cropHeight / cropWidth

      const wScale = Math.random() * (1.2 - 0.8) + 0.8
      const hScale = Math.random() * (3 - -3) + -3
      const vScale = Math.random() * (3 - 1) + 1

      const hGap = DEFAULT_H_GAP * hScale
      const vGap = DEFAULT_V_GAP * vScale

      fillingLeft = leftHeight <= (rightHeight + vGap)

      const vw = fillingLeft ? (100 - rightFill) * DEFAULT_ITEM_VW_SCALE : (100 - leftFill) * DEFAULT_ITEM_VW_SCALE
      const height = (cropAspect * (vw * wScale)) + labelHeight + vGap

      const overHalf = fillingLeft ? (rightFill - 50) : (leftFill - 50)
      const left = fillingLeft ? (50 - overHalf) - (vw * wScale) - Math.abs(hGap) : (50 + overHalf) + Math.abs(hGap)

      layout.push({
        project,
        index: index++,
        cropWidth,
        cropHeight,
        width: `${vw * wScale}vw`,
        height: '',
        top: `${fillingLeft ? leftHeight + labelHeight : rightHeight + labelHeight}vw`,
        left: `${left}vw`,
        transform: 'translate(0vw, 0vh)'
      })

      if (fillingLeft) {
        leftHeight += height
        leftFill = left + (vw * wScale)
      } else {
        rightHeight += height
        rightFill = 100 - left
      }
    }

    setGridHeight(Math.max(leftHeight, rightHeight) - (headerOffset / window.innerWidth * 100))
    setGridLayout(layout)
  }, [projectsList])

  const handleResize = useDebouncedCallback(
    () => calculateGridLayout(),
    50
  )

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize])

  useEffect(() => {
    calculateGridLayout()
  }, [calculateGridLayout])

  useEffect(() => {
    if (!transitioningOut) return

    if (nextMode === 'list' || nextMode === 'project') {
      fadeControls.set({ opacity: 1 })
      fadeControls.start({ opacity: 0 })
    }
  }, [transitioningOut, nextMode, fadeControls])

  useEffect(() => {
    if (!transitioningIn) return

    if (nextMode === 'grid') {
      fadeControls.set({ opacity: 0 })
      fadeControls.start({ opacity: 1 })
    }
  }, [transitioningIn, nextMode, fadeControls])

  return (
    <div className={styles.root}>
      <motion.div
        className={styles.header}
        ref={headerRef}
        animate={fadeControls}
        initial={{ opacity: mode === 'list' ? 0 : 1 }}
      >
        <h1>Architecture in concert<br />with nature–</h1>
      </motion.div>
      <motion.div className={styles['scroll-container']} animate={{ y: breakpoint ? `${scrollY}vw` : 0 }} transition={{ ease: 'easeOut' }}>
        <div className={styles['grid-container']} style={{ transform: breakpoint ? `translateY(${grid1Offset}vw)` : 'none' }}>
          {gridLayout.map(({ project, index, cropWidth, cropHeight, ...style }) => (
            <ProjectGridItem
              key={project.sys.id}
              project={project}
              index={index}
              cropWidth={cropWidth}
              cropHeight={cropHeight}
              style={breakpoint ? style : undefined}
            />
          ))}
        </div>
        {breakpoint && grid1Offset !== grid2Offset &&
          <div className={styles['grid-container']} style={{ transform: breakpoint ? `translateY(${grid2Offset}vw)` : 'none' }}>
            {gridLayout.map(({ project, index, cropWidth, cropHeight, ...style }) => (
              <ProjectGridItem
                key={project.sys.id}
                project={project}
                index={index}
                cropWidth={cropWidth}
                cropHeight={cropHeight}
                style={breakpoint ? style : undefined}
              />
            ))}
          </div>
        }
      </motion.div>
      <div className={styles.footer}>
        <FooterNav />
      </div>
    </div>
  )
}

export default ProjectGridTemplate
