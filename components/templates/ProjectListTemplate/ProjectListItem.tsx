import { TypeProjectFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import React from 'react'
import Image from 'next/image'
import { projectCategoryTitle } from '@utils/formatters'

import styles from './ProjectListItem.module.scss'

type TProps = {
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  index: number
}

function ProjectListItem({ project, index }: TProps) {
  console.log(project.fields.mainImage!.fields.file!)
  return (
    <div className={styles.root}>
      <Image
        src={`https:${project.fields.mainImage!.fields.file!.url}`}
        width={project.fields.mainImage!.fields.file!.details.image!.width}
        height={project.fields.mainImage!.fields.file!.details.image!.height}
        alt=""
      />
      <p>{`${index + 1}`.padStart(2, '0')}</p>
      <p>{project.fields.projectName}</p>
      <p>{projectCategoryTitle(project.fields.projectCategory)}</p>
      <p>{project.fields.year}</p>
    </div>
  )
}

export default ProjectListItem
