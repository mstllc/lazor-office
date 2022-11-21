import FooterNav from '@components/shared/FooterNav'
import Icon from '@components/shared/Icon'
import { TypeProjectsListFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import ProjectListItem from './ProjectListItem'

import styles from './ProjectListTemplate.module.scss'

type TProps = {
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
  categoryCounts: {
    all: number
    home: number
    cabin: number
    commercial: number
  }
}

function ProjectListTemplate({ projectsList, categoryCounts }: TProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const router = useRouter()

  const onFilterClick = useCallback((e: React.MouseEvent, category: string) => {
    e.preventDefault()

    if (router.query.category !== category) {
      router.replace({ pathname: '/', query: { ...router.query, category } }, undefined, { shallow: true })
    }

    setMobileFilterOpen(false)
  }, [router])

  return (
    <div className={styles.root}>
      <div className={styles['header']}>
        <h1>Project List–</h1>
        <h1 className={styles['mobile']}>Architecture in concert with nature–</h1>
        <button className={styles['filter-bar']} onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
          Filter Projects
          <motion.div animate={{ rotate: mobileFilterOpen ? 180 : 0 }}>
            <Icon name="DownCaret" />
          </motion.div>
        </button>
        <motion.div className={styles['filter-menu']} animate={{ height: mobileFilterOpen ? 'auto' : 0 }} initial={false}>
          <div className={styles['filter-options']}>
            <a href="#" onClick={(e) => onFilterClick(e, 'all')}>All</a>
            <a href="#" onClick={(e) => onFilterClick(e, 'home')}>Homes<sup>{categoryCounts.home}</sup></a>
            <a href="#" onClick={(e) => onFilterClick(e, 'cabin')}>Cabins<sup>{categoryCounts.cabin}</sup></a>
            <a href="#" onClick={(e) => onFilterClick(e, 'commercial')}>Commercial<sup>{categoryCounts.commercial}</sup></a>
          </div>
          <a className={styles['view-map']} href="#" onClick={() => { }}>View on a Map</a>
        </motion.div>
      </div>
      <div className={styles['list-container']}>
        {projectsList.fields.projects!.map((project, index) => (
          <ProjectListItem key={project.sys.id} project={project} index={index} />
        ))}
      </div>
      <FooterNav />
    </div>
  )
}

export default ProjectListTemplate
