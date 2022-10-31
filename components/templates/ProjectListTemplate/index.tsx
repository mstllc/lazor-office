import Icon from '@components/shared/Icon'
import { TypeProjectsListFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import React from 'react'

import ProjectListItem from './ProjectListItem'

import styles from './ProjectListTemplate.module.scss'

type TProps = {
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

function ProjectListTemplate({ projectsList }: TProps) {
  return (
    <div className={styles.root}>
      <h1>Architecture in concert with nature–</h1>
      <div className={styles['filter-bar']}>
        Filter Projects
        <Icon name="DownCaret" />
      </div>
      <div className={styles['list-container']}>
        {projectsList.fields.projects!.map((project, index) => (
          <ProjectListItem key={project.sys.id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}

export default ProjectListTemplate
