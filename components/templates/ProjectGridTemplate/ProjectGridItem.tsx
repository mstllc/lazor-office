import { TypeProjectFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import React from 'react'
import { projectCategoryTitle } from '@utils/formatters'

import styles from './ProjectGridItem.module.scss'

type TProps = {
  project: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectFields>
  index: number
  cropWidth: number
  cropHeight: number
  style?: React.CSSProperties
}

function ProjectGridItem({ project, index, cropWidth, cropHeight, style }: TProps) {
  const imageFile = project.fields.heroImage!.fields.image!.fields.file!

  return (
    <div className={styles.root} style={style}>
      <img className={styles.image} src={`https:${imageFile.url}?fit=crop&f=center&w=${cropWidth}&h=${cropHeight}`} alt={project.fields.heroImage!.fields.title} />
      <div className={styles.details}>
        <p className={styles.index}>{`${index + 1}`.padStart(2, '0')}</p>
        <p className={styles.name}>{project.fields.projectName}</p>
      </div>
    </div>
  )
}

export default ProjectGridItem
