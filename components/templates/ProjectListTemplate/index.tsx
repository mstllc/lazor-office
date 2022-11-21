import FooterNav from '@components/shared/FooterNav'
import Icon from '@components/shared/Icon'
import { TypeProjectsListFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

import ProjectListItem from './ProjectListItem'

import styles from './ProjectListTemplate.module.scss'

type TProps = {
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

function ProjectListTemplate({ projectsList }: TProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

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
        <motion.div className={styles['filter-menu']} animate={{ height: mobileFilterOpen ? 'auto' : 0 }}>
          <div className={styles['filter-options']}>
            <a href="#" onClick={() => setMobileFilterOpen(false)}>All</a>
            <a href="#" onClick={() => setMobileFilterOpen(false)}>Homes<sup>23</sup></a>
            <a href="#" onClick={() => setMobileFilterOpen(false)}>Cabins<sup>12</sup></a>
            <a href="#" onClick={() => setMobileFilterOpen(false)}>Commercial<sup>6</sup></a>
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
