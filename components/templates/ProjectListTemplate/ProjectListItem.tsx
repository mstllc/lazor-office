import { TypeProjectFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import React from 'react'
import { projectCategoryTitle } from '@utils/formatters'

import styles from './ProjectListItem.module.scss'

type TProps = {
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  index: number
}

function ProjectListItem({ project, index }: TProps) {
  const imageFile = project.fields.heroImage!.fields.image!.fields.file!
  const crop = project.fields.heroImage!.fields.projectListCrop as { width: number, height: number }
  const cropWidth = Math.round(imageFile.details.image!.width * crop.width)
  const cropHeight = Math.round(imageFile.details.image!.height * crop.height)

  console.log(imageFile, project.fields.heroImage!.fields.projectListCrop)

  return (
    <div className={styles.root}>
      <img className={styles.image} src={`https:${imageFile.url}?fit=crop&f=center&w=${cropWidth}&h=${cropHeight}`} alt={project.fields.heroImage!.fields.title} />
      <p className={styles.index}>{`${index + 1}`.padStart(2, '0')}</p>
      <p className={styles.name}>{project.fields.projectName} - {project.fields.location}</p>
      <p className={styles.category}>{projectCategoryTitle(project.fields.projectCategory)}</p>
      <p className={styles.year}>{project.fields.year}</p>
    </div>
  )
}

export default ProjectListItem
