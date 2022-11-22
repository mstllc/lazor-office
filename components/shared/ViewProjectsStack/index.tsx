import { TypeProjectsListFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'
import React, { useMemo } from 'react'
import Icon from '../Icon'

import styles from './ViewProjectsStack.module.scss'

type TProps = {
  projectsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeProjectsListFields>
}

function ViewProjectsStack({ projectsList }: TProps) {
  const [projects, vwHeight] = useMemo(() => {
    const elements: JSX.Element[] = []
    let vwHeight = 0
    for (const project of projectsList.fields.projects || []) {
      const imageFile = project.fields.heroImage!.fields.image!.fields.file!
      const crop = project.fields.heroImage!.fields.projectListCrop as { width: number, height: number }
      const cropWidth = Math.round(imageFile.details.image!.width * crop.width)
      const cropHeight = Math.round(imageFile.details.image!.height * crop.height)
      const cropAspect = cropHeight / cropWidth

      const scale = Math.random() * (0.8 - 0.5) + 0.5
      const xScale = Math.random() * (10 - -10) + -10

      const vw = cropAspect * 100 * scale
      if (vw > vwHeight) vwHeight = vw

      elements.push(
        <div key={project.sys.id} className={styles.project}>
          <img
            className={styles.image}
            src={`https:${imageFile.url}?fit=crop&f=center&w=${cropWidth}&h=${cropHeight}`}
            alt={project.fields.heroImage!.fields.title}
            style={{ transform: `translateX(${xScale}vw) scale(${scale})` }}
          />
        </div>
      )
    }

    return [elements, vwHeight]
  }, [projectsList])

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2>View All Projects</h2>
        <div className={styles.stack} style={{ height: `${vwHeight}vw` }}>
          {projects}
        </div>
        <p>Go to Index</p>
        <Icon name="DownCaret" />
      </div>
    </div>
  )
}

export default ViewProjectsStack
