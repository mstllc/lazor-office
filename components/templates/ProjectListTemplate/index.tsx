import FilterBar from '@components/shared/FilterBar'
import FooterNav from '@components/shared/FooterNav'
import { TypeProjectsListFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
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
  const router = useRouter()

  const onFilterChange = useCallback((category: string) => {
    if (router.query.category !== category) {
      router.replace({ pathname: '/', query: { ...router.query, category } }, undefined, { shallow: true })
    }
  }, [router])

  return (
    <div className={styles.root}>
      <div className={styles['header']}>
        <h1>Project List–</h1>
        <h1 className={styles['mobile']}>Architecture in concert with nature–</h1>
        <FilterBar
          title="Filter Projects"
          categories={[
            { value: 'all', label: 'All' },
            { value: 'home', label: 'Homes', count: categoryCounts.home },
            { value: 'cabin', label: 'Cabins', count: categoryCounts.cabin },
            { value: 'commercial', label: 'Commercial', count: categoryCounts.commercial },
          ]}
          renderRightButton={() => (
            <a className={styles['view-map']} href="#" onClick={() => { }}>View on a Map</a>
          )}
          onFilterChange={onFilterChange}
        />
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
